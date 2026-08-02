import {
  useEffect,
  useState,
} from "react";
import {
  claimInvite,
  findInvite,
  hasSupabaseConfig,
} from "../lib/playPlatformDataService";
import "../admin/PlayPlatformAdminPanel.css";

function PlayPlatformJoinPage() {
  const inviteCode =
    new URLSearchParams(window.location.search).get("invite");
  const savedPlayerStorageKey =
    inviteCode ? `playplatform-player-${inviteCode}` : null;
  const [invite, setInvite] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [playerId, setPlayerId] = useState(() => (
    savedPlayerStorageKey ? window.localStorage.getItem(savedPlayerStorageKey) ?? "" : ""
  ));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const canSubmit =
    displayName.trim().length >= 2 && invite?.status === "pending";
  const tableLink =
    invite?.table_id ? `/?table=${invite.table_id}${playerId ? `&player=${playerId}` : ""}` : "/";

  useEffect(() => {
    async function loadInvite() {
      if (!inviteCode || !hasSupabaseConfig) {
        setLoading(false);
        return;
      }

      try {
        const nextInvite =
          await findInvite(inviteCode);
        setInvite(nextInvite);
      } catch (error) {
        setMessage(`No se pudo encontrar la invitacion: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadInvite();
  }, [inviteCode]);

  const submitRequest = async () => {
    if (!canSubmit) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const player = await claimInvite({
        inviteId: invite.id,
        tableId: invite.table_id,
        displayName: displayName.trim(),
      });
      setPlayerId(player.id);
      if (savedPlayerStorageKey) {
        window.localStorage.setItem(savedPlayerStorageKey, player.id);
      }
      setInvite({
        ...invite,
        status: "claimed",
      });
      setMessage("Solicitud enviada con saldo cero. Espera que el administrador cargue tus fichas.");
    } catch (error) {
      setMessage(`No se pudo enviar la solicitud: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="admin-screen">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <span>Ingreso de jugador</span>
            <h1>PlayPlatform</h1>
          </div>
          <a href={tableLink} className="admin-header-link">
            Ver mesa
          </a>
        </header>

        <section className="admin-join-layout">
          <div className="admin-card">
            <div className="admin-card-head">
              <h2>Entrar a mesa</h2>
              <span>{invite?.play_tables?.name ?? "PASE"}</span>
            </div>

            {!hasSupabaseConfig && (
              <div className="admin-alert">
                Falta configurar Supabase.
              </div>
            )}

            {loading && (
              <div className="admin-alert">
                Buscando invitacion...
              </div>
            )}

            {!loading && !invite && (
              <div className="admin-alert">
                Invitacion no encontrada.
              </div>
            )}

            {invite?.status !== "pending" && invite && (
              <div className="admin-alert">
                Esta invitacion ya fue utilizada o no esta disponible.
              </div>
            )}

            {message && (
              <div className="admin-alert">
                {message}
              </div>
            )}

            <label>
              Tu nombre en la mesa
              <input
                placeholder="Ej: Rodrigo"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                disabled={saving || invite?.status !== "pending"}
              />
            </label>

            <button
              type="button"
              onClick={submitRequest}
              disabled={!canSubmit || saving}
            >
              Solicitar ingreso
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformJoinPage;
