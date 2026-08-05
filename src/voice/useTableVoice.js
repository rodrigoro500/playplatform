import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  hasSupabaseConfig,
  supabase,
} from "../lib/supabaseClient";

const rtcConfig = {
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
};

function createClientId(playerId) {
  return `${playerId || "guest"}-${crypto.randomUUID()}`;
}

function getAudioStreamFromTrack(event) {
  if (event.streams?.[0]) {
    return event.streams[0];
  }

  return new MediaStream([event.track]);
}

function formatVoiceError(error) {
  if (error?.name === "NotAllowedError") {
    return "Permiso de microfono rechazado.";
  }

  if (error?.name === "NotFoundError") {
    return "No se encontro microfono en este dispositivo.";
  }

  return error?.message ?? "No se pudo iniciar la voz.";
}

function useTableVoice({
  tableId,
  player,
  tablePlayers = [],
}) {
  const clientIdRef = useRef(createClientId(player?.id));
  const channelRef = useRef(null);
  const peersRef = useRef(new Map());
  const localStreamRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [roomMuted, setRoomMuted] = useState(false);
  const [status, setStatus] = useState("");
  const [participants, setParticipants] = useState([]);

  const roomId = useMemo(
    () => (tableId ? `voice:${tableId}` : null),
    [tableId]
  );

  const playerNames = useMemo(
    () => new Map(tablePlayers.map((item) => [item.id, item.name])),
    [tablePlayers]
  );

  const updateParticipant = useCallback((clientId, patch) => {
    setParticipants((current) => {
      const exists =
        current.some((participant) => participant.clientId === clientId);

      if (!exists) {
        return [
          ...current,
          {
            clientId,
            playerId: patch.playerId,
            name: patch.name ?? playerNames.get(patch.playerId) ?? "Jugador",
            stream: patch.stream ?? null,
            speaking: false,
          },
        ];
      }

      return current.map((participant) => (
        participant.clientId === clientId ?
          {
            ...participant,
            ...patch,
            name: patch.name ?? participant.name,
          } :
          participant
      ));
    });
  }, [playerNames]);

  const removeParticipant = useCallback((clientId) => {
    setParticipants((current) => (
      current.filter((participant) => participant.clientId !== clientId)
    ));
  }, []);

  const sendSignal = useCallback(async (payload) => {
    const channel = channelRef.current;

    if (!channel || !roomId || !player) {
      return;
    }

    await channel.send({
      type: "broadcast",
      event: "voice-signal",
      payload: {
        ...payload,
        roomId,
        from: clientIdRef.current,
        playerId: player.id,
        playerName: player.name,
      },
    });
  }, [player, roomId]);

  const getRemoteClientsFromPresence = useCallback(() => {
    const presenceState =
      channelRef.current?.presenceState?.() ?? {};

    return Object.values(presenceState)
      .flat()
      .filter((presence) => (
        presence.clientId &&
        presence.clientId !== clientIdRef.current
      ))
      .map((presence) => ({
        clientId: presence.clientId,
        playerId: presence.playerId,
        playerName: presence.playerName,
      }));
  }, []);

  const closePeer = useCallback((clientId) => {
    const peer = peersRef.current.get(clientId);

    if (peer) {
      peer.pc.close();
      peersRef.current.delete(clientId);
    }

    removeParticipant(clientId);
  }, [removeParticipant]);

  const ensurePeer = useCallback(({
    clientId,
    playerId,
    playerName,
  }) => {
    const existingPeer =
      peersRef.current.get(clientId);

    if (existingPeer) {
      return existingPeer.pc;
    }

    const pc = new RTCPeerConnection(rtcConfig);

    localStreamRef.current?.getTracks().forEach((track) => {
      pc.addTrack(track, localStreamRef.current);
    });

    pc.onicecandidate = (event) => {
      if (!event.candidate) {
        return;
      }

      sendSignal({
        type: "ice",
        to: clientId,
        candidate: event.candidate,
      });
    };

    pc.ontrack = (event) => {
      updateParticipant(clientId, {
        playerId,
        name: playerName,
        stream: getAudioStreamFromTrack(event),
      });
    };

    pc.onconnectionstatechange = () => {
      if (
        pc.connectionState === "failed" ||
        pc.connectionState === "closed" ||
        pc.connectionState === "disconnected"
      ) {
        closePeer(clientId);
      }
    };

    peersRef.current.set(clientId, {
      pc,
      playerId,
      playerName,
    });

    updateParticipant(clientId, {
      playerId,
      name: playerName,
    });

    return pc;
  }, [closePeer, sendSignal, updateParticipant]);

  const createOfferFor = useCallback(async (remoteClient) => {
    const pc = ensurePeer(remoteClient);

    if (pc.signalingState !== "stable") {
      return;
    }

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);
    await sendSignal({
      type: "offer",
      to: remoteClient.clientId,
      sdp: offer,
    });
  }, [ensurePeer, sendSignal]);

  const syncPresencePeers = useCallback(async () => {
    const remoteClients =
      getRemoteClientsFromPresence();
    const remoteClientIds =
      new Set(remoteClients.map((remoteClient) => remoteClient.clientId));

    peersRef.current.forEach((peer, clientId) => {
      if (!remoteClientIds.has(clientId)) {
        peer.pc.close();
        peersRef.current.delete(clientId);
        removeParticipant(clientId);
      }
    });

    await Promise.all(remoteClients.map(async (remoteClient) => {
      updateParticipant(remoteClient.clientId, {
        playerId: remoteClient.playerId,
        name: remoteClient.playerName,
      });

      if (clientIdRef.current < remoteClient.clientId) {
        await createOfferFor(remoteClient);
      }
    }));

    if (remoteClients.length === 0) {
      setStatus("Voz conectada. Esperando otros jugadores...");
    } else {
      setStatus(`Voz conectada con ${remoteClients.length} jugador(es).`);
    }
  }, [createOfferFor, getRemoteClientsFromPresence, removeParticipant, updateParticipant]);

  const handleSignal = useCallback(async ({
    payload,
  }) => {
    if (
      !payload ||
      payload.roomId !== roomId ||
      payload.from === clientIdRef.current ||
      (payload.to && payload.to !== clientIdRef.current)
    ) {
      return;
    }

    const remoteClient = {
      clientId: payload.from,
      playerId: payload.playerId,
      playerName: payload.playerName,
    };

    try {
      if (payload.type === "join") {
        updateParticipant(payload.from, {
          playerId: payload.playerId,
          name: payload.playerName,
        });
        return;
      }

      if (payload.type === "leave") {
        closePeer(payload.from);
        return;
      }

      const pc = ensurePeer(remoteClient);

      if (payload.type === "offer") {
        await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        await sendSignal({
          type: "answer",
          to: payload.from,
          sdp: answer,
        });
        return;
      }

      if (payload.type === "answer") {
        await pc.setRemoteDescription(new RTCSessionDescription(payload.sdp));
        return;
      }

      if (payload.type === "ice" && payload.candidate) {
        await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
      }
    } catch (error) {
      setStatus(`Voz: ${formatVoiceError(error)}`);
    }
  }, [closePeer, ensurePeer, roomId, sendSignal, updateParticipant]);

  const leaveVoice = useCallback(async () => {
    await sendSignal({
      type: "leave",
    });

    channelRef.current?.unsubscribe();
    channelRef.current = null;
    peersRef.current.forEach((peer) => peer.pc.close());
    peersRef.current.clear();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    setParticipants([]);
    setConnected(false);
    setConnecting(false);
    setMicEnabled(false);
    setStatus("");
  }, [sendSignal]);

  const joinVoice = useCallback(async () => {
    if (!roomId || !player) {
      setStatus("Entra a una mesa real para usar voz.");
      return;
    }

    if (!hasSupabaseConfig || !supabase) {
      setStatus("Falta configurar Supabase para usar voz.");
      return;
    }

    if (player.muted) {
      setStatus("Tu microfono esta silenciado por el administrador.");
      return;
    }

    if (connected || connecting) {
      return;
    }

    setConnecting(true);
    setStatus("Solicitando microfono...");

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });

      localStreamRef.current = stream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });

      const channel =
        supabase.channel(roomId, {
          config: {
            broadcast: {
              ack: true,
              self: false,
            },
            presence: {
              key: clientIdRef.current,
            },
          },
        });

      channelRef.current = channel;

      channel.on("broadcast", {
        event: "voice-signal",
      }, handleSignal);

      channel.on("presence", {
        event: "sync",
      }, () => {
        syncPresencePeers();
      });

      channel.on("presence", {
        event: "leave",
      }, ({
        leftPresences,
      }) => {
        leftPresences?.forEach((presence) => {
          closePeer(presence.clientId);
        });
      });

      channel.subscribe(async (subscribeStatus) => {
        if (subscribeStatus !== "SUBSCRIBED") {
          return;
        }

        await channel.track({
          clientId: clientIdRef.current,
          playerId: player.id,
          playerName: player.name,
          joinedAt: new Date().toISOString(),
        });
        setConnected(true);
        setConnecting(false);
        setMicEnabled(true);
        setStatus("Voz conectada. Buscando jugadores...");
        await sendSignal({
          type: "join",
        });
      });
    } catch (error) {
      setConnecting(false);
      setStatus(formatVoiceError(error));
    }
  }, [closePeer, connected, connecting, handleSignal, player, roomId, sendSignal, syncPresencePeers]);

  const toggleMic = useCallback(() => {
    if (player?.muted) {
      setStatus("Tu microfono esta silenciado por el administrador.");
      return;
    }

    const nextMicEnabled =
      !micEnabled;

    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = nextMicEnabled;
    });

    setMicEnabled(nextMicEnabled);
  }, [micEnabled, player?.muted]);

  useEffect(() => () => {
    channelRef.current?.unsubscribe();
    peersRef.current.forEach((peer) => peer.pc.close());
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    if (player?.muted && micEnabled) {
      localStreamRef.current?.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      setMicEnabled(false);
      setStatus("Tu microfono fue silenciado por el administrador.");
    }
  }, [micEnabled, player?.muted]);

  return {
    connected,
    connecting,
    micEnabled,
    roomMuted,
    status,
    participants,
    joinVoice,
    leaveVoice,
    toggleMic,
    toggleRoomAudio: () => setRoomMuted((current) => !current),
  };
}

export default useTableVoice;
