import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PaseCasinoDemoRuntime, {
  formatMoney,
} from "./PaseCasinoDemoRuntime";
import {
  fetchGameSnapshot,
  fetchTableById,
  hasSupabaseConfig,
  saveGameSnapshot,
  syncPlayerWalletBalances,
} from "../../../lib/playPlatformDataService";
import "./PlayPlatformCasinoExperience.css";

const phaseLabels = {
  WAITING_TABLE: "Mesa lista",
  WAITING_MAIN_POT: "Armando pozo",
  WAITING_ROLL: "Esperando tirada",
  ROLLING_DICE: "Girando dados",
  POINT_ACTIVE: "Punto activo",
  ROUND_FINISHED: "Ronda resuelta",
};

const quickBetPhaseLabels = {
  BETTING: "Apuestas abiertas",
  BALANCING: "Devolviendo excedentes",
  READY: "Listo para lanzar",
};

const pipMap = {
  1: ["pip-center"],
  2: ["pip-top-left", "pip-bottom-right"],
  3: ["pip-top-left", "pip-center", "pip-bottom-right"],
  4: ["pip-top-left", "pip-top-right", "pip-bottom-left", "pip-bottom-right"],
  5: ["pip-top-left", "pip-top-right", "pip-center", "pip-bottom-left", "pip-bottom-right"],
  6: ["pip-top-left", "pip-top-right", "pip-mid-left", "pip-mid-right", "pip-bottom-left", "pip-bottom-right"],
};

const chatMessages = [
  ["LuisMG", "Vamos con todo.", "14:21"],
  ["Carlos89", "Buena suerte a todos.", "14:21"],
  ["RRVisionHD", "Hoy se gana.", "14:22"],
];

function getTableIdFromUrl() {
  return new URLSearchParams(window.location.search).get("table");
}

function getPlayerIdFromUrl() {
  return new URLSearchParams(window.location.search).get("player");
}

function mapLivePlayerToRuntimePlayer(player) {
  return {
    id: player.id,
    name: player.name,
    wallet: player.chips,
  };
}

function mergeAdminWalletLoads(currentState, runtimePlayers) {
  let changed = false;
  const liveWallets = new Map(
    runtimePlayers.map((player) => [player.id, player.wallet])
  );
  const players = currentState.players.map((player) => {
    const liveWallet =
      liveWallets.get(player.id);

    if (typeof liveWallet !== "number" || liveWallet <= player.wallet) {
      return player;
    }

    changed = true;

    return {
      ...player,
      wallet: liveWallet,
      formattedWallet: formatMoney(liveWallet),
    };
  });

  return changed ? {
    ...currentState,
    players,
  } : currentState;
}

function Die({
  value,
  rolling = false,
}) {
  return (
    <div className={`casino-die ${rolling ? "is-rolling" : ""}`}>
      {(pipMap[value] ?? []).map((pip) => (
        <span
          key={pip}
          className={`casino-die-pip ${pip}`}
        />
      ))}
    </div>
  );
}

function Panel({
  children,
}) {
  return (
    <section className="casino-panel">
      {children}
    </section>
  );
}

function ChipStack({
  amount,
  compact = false,
}) {
  const scale = compact ? 0.82 : 1;

  return (
    <div>
      <div style={{
        position: "relative",
        height: 40 * scale,
        width: 64 * scale,
        margin: "0 auto",
      }}>
        <span style={{
          position: "absolute",
          left: 8 * scale,
          top: 16 * scale,
          height: 18 * scale,
          width: 36 * scale,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.4)",
          background: "linear-gradient(135deg,#f87171,#991b1b,#450a0a)",
        }} />
        <span style={{
          position: "absolute",
          left: 24 * scale,
          top: 6 * scale,
          height: 18 * scale,
          width: 36 * scale,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.4)",
          background: "linear-gradient(135deg,#6ee7b7,#047857,#022c22)",
        }} />
        <span style={{
          position: "absolute",
          left: 3 * scale,
          top: 0,
          height: 18 * scale,
          width: 36 * scale,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,.4)",
          background: "linear-gradient(135deg,#fafafa,#71717a,#09090b)",
        }} />
      </div>
    </div>
  );
}

function PlayerBadge({
  player,
  index,
  prompted = false,
  current = false,
  quickBet = null,
}) {
  const initials = player.name.slice(0, 2).toUpperCase();

  return (
    <div className={`casino-player seat-${index} ${prompted ? "is-prompted" : ""}`}>
      <div className={`casino-player-card ${player.isShooter ? "is-shooter" : ""} ${prompted ? "is-prompted" : ""} ${current ? "is-current-player" : ""}`}>
        <div className="casino-player-avatar">
          {initials}
        </div>
        <div>
          <div className="casino-player-name">
            {player.name}
          </div>
          <div className="casino-player-money">
            {player.formattedWallet} Gs
          </div>
          {player.isShooter && (
            <div className="casino-shooter-tag">
              Tirador
            </div>
          )}
          {quickBet && (
            <div className={`casino-seat-bet ${quickBet.selection === "SUERTE" ? "suerte" : "kulo"}`}>
              {formatMoney(quickBet.amount)} Gs
            </div>
          )}
        </div>
      </div>
      <div className="casino-chip-stack">
      <ChipStack amount={(index + 1) * 25000} />
      </div>
    </div>
  );
}

function AvailableSeat({
  index,
}) {
  return (
    <div className={`casino-player seat-${index}`}>
      <div className="casino-player-card is-available">
        <div className="casino-player-avatar available">
          +
        </div>
      </div>
    </div>
  );
}

function LeftPanel({
  table,
  selectedBet,
  selectedAmount,
  quickBetPhase,
  quickBetSeconds,
  canConfirmQuickBet,
  onSelectBet,
  onSelectAmount,
  onConfirmBet,
}) {
  const quickAmounts = [1000, 5000, 10000, 50000, 100000];
  const quickBetOpen = quickBetPhase === "BETTING";

  return (
    <aside className="casino-panel-stack">
      <Panel>
        <div className="casino-panel-title" style={{ textAlign: "center" }}>
          Jugadas rapidas
        </div>
        <div className={`casino-quick-timer is-${quickBetPhase.toLowerCase()}`}>
          <span>{quickBetPhaseLabels[quickBetPhase]}</span>
          {quickBetPhase !== "READY" && (
            <strong>{quickBetSeconds}s</strong>
          )}
        </div>
        <div className="casino-quick-pool">
          <button
            type="button"
            className={`suerte ${selectedBet === "SUERTE" ? "is-selected" : ""}`}
            onClick={() => onSelectBet("SUERTE")}
            disabled={!quickBetOpen}
          >
            <span>SUERTE</span>
            <strong>{formatMoney(table.instantPool.suerte)} Gs</strong>
          </button>
          <button
            type="button"
            className={`kulo ${selectedBet === "KULO" ? "is-selected" : ""}`}
            onClick={() => onSelectBet("KULO")}
            disabled={!quickBetOpen}
          >
            <span>KULO</span>
            <strong>{formatMoney(table.instantPool.kulo)} Gs</strong>
          </button>
        </div>
        <div className="casino-chip-grid">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => onSelectAmount(amount)}
              className={`casino-chip-button ${amount === selectedAmount ? "is-active" : ""}`}
              disabled={!quickBetOpen}
            >
              {formatMoney(amount)}
              <span style={{ display: "block", fontSize: 9 }}>Gs</span>
            </button>
          ))}
          <button
            type="button"
            className="casino-chip-button"
            disabled={!quickBetOpen}
          >
            Otro
          </button>
        </div>
        <label className="casino-quick-custom">
          <span>Monto libre</span>
          <input
            type="number"
            min="1000"
            step="1000"
            value={selectedAmount}
            disabled={!quickBetOpen}
            onChange={(event) => {
              const value = event.target.value;
              onSelectAmount(value === "" ? "" : Number(value));
            }}
          />
        </label>
        <button
          type="button"
          className="casino-quick-confirm"
          onClick={onConfirmBet}
          disabled={!canConfirmQuickBet}
        >
          Apostar {selectedBet}
        </button>
      </Panel>

      <ChatPanel />
    </aside>
  );
}

function ChatPanel() {
  const [open, setOpen] = useState(false);

  return (
    <Panel>
      <div className="casino-chat-header">
        <div>
          <div className="casino-panel-title">Chat de mesa</div>
          <div className="casino-muted">3 jugadores activos</div>
        </div>
        <button
          type="button"
          className="casino-chat-toggle"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? "Minimizar" : "Abrir"}
        </button>
      </div>
      {open && (
        <>
          <div className="casino-chat-list">
            {chatMessages.map(([name, message, time]) => (
              <div key={`${name}-${time}`} className="casino-chat-row">
                <div className="casino-chat-avatar">{name.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div className="casino-chat-name">{name}</div>
                  <div className="casino-chat-message">{message}</div>
                </div>
                <div className="casino-chat-time">{time}</div>
              </div>
            ))}
          </div>
          <div className="casino-chat-composer">
            <input
              type="text"
              className="casino-chat-input"
              placeholder="Escribe en la mesa..."
            />
            <button type="button" className="casino-chat-voice">
              Voz
            </button>
            <button type="button" className="casino-chat-send">
              Enviar
            </button>
          </div>
        </>
      )}
    </Panel>
  );
}

function HistoryRow({
  item,
}) {
  const badgeKind =
    item.result === "PUNTO" ?
      "point" :
      item.result === "PASE" ||
      item.result === "SUERTE" ||
      item.result === "PRIMERA SUERTE" ?
        "good" :
        "bad";

  return (
    <div className="casino-history-row">
      <span style={{ color: "#71717a", fontWeight: 800 }}>
        #{String(item.round).padStart(4, "0")}
      </span>
      <strong>{item.dice} = {item.total}</strong>
      <span className={`casino-badge ${badgeKind}`}>
        {item.result}
      </span>
    </div>
  );
}

function RightPanel({
  table,
  players,
  phase,
  history,
}) {
  const shooter = players.find((player) => player.id === table.shooterId);
  const isCopado = table.mainPot.status === "COPADO";
  const copadoContributions = getMainPotContributions(table.mainPot, players);
  const visibleHistory = (history.length > 0 ? history : [
    { id: "s1", round: 1023, dice: "6 + 5", total: 11, result: "KULO" },
    { id: "s2", round: 1022, dice: "3 + 4", total: 7, result: "PASE" },
    { id: "s3", round: 1021, dice: "2 + 2", total: 4, result: "KULO" },
    { id: "s4", round: 1020, dice: "1 + 4", total: 5, result: "SUERTE" },
    { id: "s5", round: 1019, dice: "2 + 6", total: 8, result: "KULO" },
  ]).slice(0, 10);

  return (
    <aside className="casino-panel-stack">
      <Panel>
        <div className="casino-panel-title">Ronda actual</div>
        <div className="casino-round-list">
          <div>Tirador: <strong>{shooter?.name ?? table.shooterId}</strong></div>
          <div>Pozo objetivo: <strong>{formatMoney(table.mainPot.target)} Gs</strong></div>
          {isCopado ? (
            <div className="casino-round-copado">
              <strong>COPADO</strong>
              <span>{shooter?.name ?? "Tirador"}: {formatMoney(table.mainPot.suerte)} Gs por SUERTE</span>
              {copadoContributions.map((contribution) => (
                <span key={contribution.playerId}>
                  {contribution.name}: {formatMoney(contribution.amount)} Gs por KULO
                </span>
              ))}
            </div>
          ) : (
            <div>Falta cubrir: <strong>{formatMoney(table.mainPot.requiredCover)} Gs</strong></div>
          )}
          <div>Minima pozo: <strong>20.000 Gs</strong></div>
          <div>Estado: <strong style={{ color: "#34d399" }}>{phase}</strong></div>
        </div>
      </Panel>

      <Panel>
        <div className="casino-panel-title">Historial de rondas</div>
        <div className="casino-history-list expanded">
          {visibleHistory.map((item) => (
            <HistoryRow key={item.id} item={item} />
          ))}
        </div>
      </Panel>
    </aside>
  );
}

function getMainPotContributions(mainPot, players) {
  const playerNames = new Map(players.map((player) => [player.id, player.name]));
  const contributions = new Map();

  (mainPot.coverageLog ?? [])
    .filter((item) => item.action === "CUBRIO")
    .forEach((item) => {
      contributions.set(
        item.playerId,
        (contributions.get(item.playerId) ?? 0) + item.amount
      );
    });

  return Array.from(contributions.entries())
    .map(([playerId, amount]) => ({
      playerId,
      name: playerNames.get(playerId) ?? playerId,
      amount,
    }))
    .reverse();
}

function GameTable({
  table,
  players,
  dice,
  rollingDice,
  isRolling,
  selectedShooter,
  mainPotAmount,
  coverAmount,
  onSelectShooter,
  onSelectMainPotAmount,
  onSetShooterStake,
  onCoverMainPot,
  onPassMainPotCoverage,
  onSelectCoverAmount,
  currentPlayerId,
}) {
  const diceValues =
    isRolling ? rollingDice :
      dice.values.length > 0 ? dice.values : [null, null];
  const currentResult =
    isRolling ? "Girando dados..." :
      dice.outcome ?? (dice.total ? "Punto establecido" : "El que se la juega");
  const playerNames = new Map(players.map((player) => [player.id, player.name]));
  const latestBets = new Map();

  (table.betFeed ?? []).forEach((bet) => {
    if (bet.amount > 0 && !latestBets.has(bet.playerId)) {
      latestBets.set(bet.playerId, bet);
    }
  });

  return (
    <div className="casino-table-stage">
      <div className="casino-table-glow" />
      <div className="casino-wood-table">
        <div className="casino-wood-inner">
          <div className="casino-wood-ring" />
          <div className="casino-table-title">
            <small>PlayPlatform</small>
          <strong>PASE</strong>
          <span>{currentResult}</span>
          </div>
          <div className="casino-dice-row">
            <Die value={diceValues[0]} rolling={isRolling} />
            <Die value={diceValues[1]} rolling={isRolling} />
          </div>
          <div className="casino-turn-pill">
            Turno del tirador | Punto: {table.point ?? "Sin punto"}
          </div>
        </div>
      </div>
      {players.map((player, index) => (
        <PlayerBadge
          key={player.id}
          player={player}
          index={index}
          prompted={table.mainPot.promptedCoverPlayerId === player.id}
          current={currentPlayerId === player.id}
          quickBet={latestBets.get(player.id)}
        />
      ))}
      {Array.from({
        length: Math.max(0, 8 - players.length),
      }, (_, offset) => (
        <AvailableSeat key={`available-${offset}`} index={players.length + offset} />
      ))}
    </div>
  );
}

function MainPotTablePrompt({
  table,
  players,
  playerNames,
  selectedShooter,
  mainPotAmount,
  coverAmount,
  onSelectShooter,
  onSelectMainPotAmount,
  onSetShooterStake,
  onCoverMainPot,
  onPassMainPotCoverage,
  onSelectCoverAmount,
}) {
  const mainPot = table.mainPot;
  if (mainPot.status === "COPADO") {
    return null;
  }

  const promptedPlayer = players.find(
    (player) => player.id === mainPot.promptedCoverPlayerId
  );
  const canSetShooterStake = Boolean(selectedShooter) && mainPotAmount >= 20000;
  const canCover = Boolean(promptedPlayer && mainPot.requiredCover > 0);

  return (
    <div className={`casino-main-pot-prompt ${mainPot.status === "COPADO" ? "is-copado" : ""}`}>
      <div className="casino-main-pot-prompt-head">
        <span>Pozo principal</span>
        <strong>{mainPot.status === "COPADO" ? "COPADO" : formatMoney(mainPot.total) + " Gs"}</strong>
      </div>
      {mainPot.status === "ESPERANDO_TIRADOR" && (
        <div className="casino-main-pot-form">
          <label>
            Tirador
            <select
              value={selectedShooter}
              onChange={(event) => onSelectShooter(event.target.value)}
              disabled={players.length === 0}
            >
              {players.length === 0 && (
                <option value="">Esperando jugadores</option>
              )}
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Aporte obligatorio por SUERTE
            <input
              type="number"
              min="20000"
              step="1000"
              value={mainPotAmount}
              onChange={(event) => onSelectMainPotAmount(Number(event.target.value))}
            />
          </label>
          <button
            type="button"
            onClick={onSetShooterStake}
            disabled={!canSetShooterStake}
          >
            Fijar pozo
          </button>
        </div>
      )}
      {mainPot.status !== "ESPERANDO_TIRADOR" && (
        <div className="casino-main-pot-cover">
          <div>
            <span>Debe cubrir por KULO</span>
            <strong>{promptedPlayer ? promptedPlayer.name : "Sin jugador pendiente"}</strong>
            <small>
              Tope restante: {formatMoney(mainPot.requiredCover)} Gs
            </small>
          </div>
          <input
            type="number"
            min="20000"
            max={mainPot.requiredCover}
            step="10000"
            value={Math.min(coverAmount, mainPot.requiredCover || coverAmount)}
            onChange={(event) => onSelectCoverAmount(Number(event.target.value))}
            disabled={!canCover}
          />
          <button
            type="button"
            onClick={onCoverMainPot}
            disabled={!canCover}
          >
            Igualar
          </button>
          <button
            type="button"
            onClick={onPassMainPotCoverage}
            disabled={!canCover}
          >
            Pasar
          </button>
        </div>
      )}
      {(mainPot.coverageLog ?? []).length > 0 && (
        <div className="casino-main-pot-log">
          {(mainPot.coverageLog ?? []).slice(0, 3).map((item) => (
            <span key={item.id}>
              {playerNames.get(item.playerId) ?? item.playerId}: {item.action === "CUBRIO" ? formatMoney(item.amount) + " Gs" : "Paso"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function BottomBar({
  table,
  players,
  isRolling,
  selectedBet,
  selectedAmount,
  currentPlayerId,
  isLivePlayer,
  mainPotAmount,
  coverAmount,
  quickBetPhase,
  quickBetSeconds,
  onSelectMainPotAmount,
  onSetShooterStake,
  onSelectCoverAmount,
  onCoverMainPot,
  onPassMainPotCoverage,
  onAcceptShooterTurn,
  onPassShooterTurn,
  onRoll,
}) {
  const currentPlayer =
    players.find((player) => player.id === currentPlayerId) ?? null;
  const shooter =
    players.find((player) => player.id === table.shooterId) ?? null;
  const promptedPlayer =
    players.find((player) => player.id === table.mainPot.promptedCoverPlayerId) ?? null;
  const currentBet =
    table.betFeed.find((bet) => bet.playerId === currentPlayerId) ?? table.currentBet;
  const selectedAmountValue = Number(selectedAmount) || 0;
  const mainPotAmountValue = Number(mainPotAmount) || 0;
  const coverAmountValue = Number(coverAmount) || 0;
  const mainPotCopado = table.mainPot.status === "COPADO";
  const shouldAskShooter =
    table.mainPot.status === "PREGUNTAR_TIRADOR" ||
    (
      !mainPotCopado &&
      table.mainPot.status !== "ESPERANDO_TIRADOR" &&
      table.mainPot.total === 0 &&
      table.mainPot.requiredCover === 0 &&
      !table.mainPot.promptedCoverPlayerId
    );
  const canSetShooterStake =
    currentPlayerId === table.shooterId &&
    mainPotAmountValue >= 20000 &&
    mainPotAmountValue <= (currentPlayer?.wallet ?? 0);
  const canCoverMainPot =
    currentPlayerId === table.mainPot.promptedCoverPlayerId &&
    coverAmountValue > 0 &&
    coverAmountValue <= table.mainPot.requiredCover &&
    coverAmountValue <= (currentPlayer?.wallet ?? 0);
  const canRollDice =
    mainPotCopado &&
    quickBetPhase === "READY" &&
    !isRolling &&
    currentPlayerId === table.shooterId;
  const rollLabel =
    isRolling ? "Girando..." :
      quickBetPhase === "BETTING" ? `Apuestas ${quickBetSeconds}s` :
        quickBetPhase === "BALANCING" ? `Ajustando ${quickBetSeconds}s` :
          !mainPotCopado ? "Falta copar pozo" :
            table.running ? "Lanzar dados" : "Confirmar apuesta";
  const currentBetSettled =
    currentBet?.status === "GANADA" ||
    currentBet?.status === "PERDIDA";

  return (
    <div className="casino-bottom-bar">
      {shouldAskShooter && (
        <div className="casino-action-box wide">
          <small>{currentPlayerId === table.shooterId ? "Tu turno" : "Cambio de turno"}</small>
          <strong>{shooter?.name ?? "Sin tirador"}</strong>
          {currentPlayerId === table.shooterId ? (
            <div className="casino-bottom-inline">
              <button type="button" onClick={onAcceptShooterTurn}>
                Seguir tirando
              </button>
              <button type="button" onClick={onPassShooterTurn}>
                Pasar turno
              </button>
            </div>
          ) : (
            <span className="casino-current-bet-side">
              Esperando si {shooter?.name ?? "el tirador"} quiere volver a tirar
            </span>
          )}
        </div>
      )}
      {table.mainPot.status === "ESPERANDO_TIRADOR" && (
        <div className="casino-action-box wide">
          <small>{currentPlayerId === table.shooterId ? "Eres tirador" : "Pozo del tirador"}</small>
          <strong>{shooter?.name ?? "Esperando tirador"}</strong>
          {currentPlayerId === table.shooterId ? (
            <div className="casino-bottom-inline">
              <input
                type="number"
                min="20000"
                step="1000"
                value={mainPotAmount}
                onChange={(event) => onSelectMainPotAmount(Number(event.target.value))}
              />
              <button type="button" onClick={onSetShooterStake} disabled={!canSetShooterStake}>
                Fijar pozo
              </button>
            </div>
          ) : (
            <span className="casino-current-bet-side">
              Esperando que el tirador fije el pozo
            </span>
          )}
        </div>
      )}
      {table.mainPot.status !== "ESPERANDO_TIRADOR" &&
        !shouldAskShooter &&
        !mainPotCopado && (
        <div className="casino-action-box wide">
          <small>Copar pozo por KULO</small>
          <strong>{promptedPlayer?.name ?? "Buscando cobertura"}</strong>
          {currentPlayerId === table.mainPot.promptedCoverPlayerId ? (
            <div className="casino-bottom-inline">
              <input
                type="number"
                min="1"
                max={table.mainPot.requiredCover}
                step="1000"
                value={Math.min(coverAmount, table.mainPot.requiredCover || coverAmount)}
                onChange={(event) => onSelectCoverAmount(Number(event.target.value))}
              />
              <button type="button" onClick={onCoverMainPot} disabled={!canCoverMainPot}>
                Copar
              </button>
              <button type="button" onClick={onPassMainPotCoverage}>
                Pasar
              </button>
            </div>
          ) : (
            <span className="casino-current-bet-side">
              Esperando respuesta de {promptedPlayer?.name ?? "otro jugador"}
            </span>
          )}
        </div>
      )}
      {mainPotCopado && (
        <div className="casino-action-box">
          <small>Tu apuesta actual</small>
          <strong>
            {formatMoney(currentBet?.amount ?? selectedAmountValue)} Gs
          </strong>
          <span className="casino-current-bet-side">
            {currentBet ? currentBet.selection : selectedBet}
          </span>
          {currentBetSettled && (
            <span className={`casino-current-bet-result ${currentBet.status === "GANADA" ? "is-win" : "is-loss"}`}>
              {currentBet.status}
              {currentBet.status === "GANADA" &&
                ` +${formatMoney(currentBet.profit)} Gs`}
            </span>
          )}
          {currentBet?.refundedAmount > 0 && (
            <span className="casino-current-bet-result is-refund">
              Devuelto {formatMoney(currentBet.refundedAmount)} Gs
            </span>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={onRoll}
        className="casino-action-button primary"
        disabled={!canRollDice}
      >
        {rollLabel}
      </button>
    </div>
  );
}

function PlayPlatformCasinoExperience() {
  const tableId = useMemo(() => getTableIdFromUrl(), []);
  const urlPlayerId = useMemo(() => getPlayerIdFromUrl(), []);
  const isLivePlayer = Boolean(tableId && urlPlayerId);
  const runtimeRef = useRef(null);
  if (runtimeRef.current === null) {
    runtimeRef.current = new PaseCasinoDemoRuntime({
      players: tableId ? [] : undefined,
    });
  }
  const runtime = runtimeRef.current;
  const rollTimerRef = useRef(null);
  const rollIntervalRef = useRef(null);
  const lastSnapshotSignatureRef = useRef("");
  const savingSnapshotRef = useRef(false);
  const [gameState, setGameState] = useState(runtime.getState());
  const [liveTable, setLiveTable] = useState(null);
  const [liveTableStatus, setLiveTableStatus] = useState(tableId ? "Cargando mesa..." : "");
  const [isRolling, setIsRolling] = useState(false);
  const [rollingDice, setRollingDice] = useState([1, 1]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedBet, setSelectedBet] = useState("SUERTE");
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [selectedQuickBetPlayer, setSelectedQuickBetPlayer] = useState(tableId ? "" : "P3");
  const [selectedShooter, setSelectedShooter] = useState(tableId ? "" : "P1");
  const [mainPotAmount, setMainPotAmount] = useState(100000);
  const [coverAmount, setCoverAmount] = useState(100000);
  const [quickBetPhase, setQuickBetPhase] = useState("BETTING");
  const [quickBetSeconds, setQuickBetSeconds] = useState(20);
  const {
    table,
    players,
    dice,
    history,
  } = gameState;
  const remoteRolling =
    table.phase === "ROLLING_DICE";
  const currentPlayerId =
    isLivePlayer ? urlPlayerId : selectedQuickBetPlayer;
  const accountPlayer =
    players.find((player) => player.id === currentPlayerId) ?? players[0] ?? null;
  const selectedAmountValue =
    Number(selectedAmount) || 0;
  const canConfirmQuickBet =
    quickBetPhase === "BETTING" &&
    table.mainPot.status === "COPADO" &&
    Boolean(accountPlayer) &&
    selectedAmountValue >= 1000 &&
    selectedAmountValue <= (accountPlayer?.wallet ?? 0);
  const phase = phaseLabels[table.phase] ?? table.phase;
  const updateState = (nextState, {
    persist = true,
  } = {}) => {
    const syncedState = {
      ...nextState,
    };

    runtimeRef.current.hydrateState(syncedState);
    setGameState(syncedState);

    if (tableId && persist) {
      const snapshotSignature =
        JSON.stringify(syncedState);
      lastSnapshotSignatureRef.current = snapshotSignature;
      savingSnapshotRef.current = true;
      saveGameSnapshot(tableId, syncedState)
        .then(() => syncPlayerWalletBalances(syncedState.players))
        .catch((error) => {
          setLiveTableStatus(`No se pudo sincronizar la mesa: ${error.message}`);
        })
        .finally(() => {
          savingSnapshotRef.current = false;
        });
    }
  };
  const resetQuickBetWindow = () => {
    setQuickBetPhase("BETTING");
    setQuickBetSeconds(20);
  };

  useEffect(() => {
    if (!tableId) {
      return undefined;
    }

    let isMounted = true;

    const loadLiveTable = async () => {
      if (!hasSupabaseConfig) {
        setLiveTableStatus("Falta configurar Supabase.");
        return;
      }

      try {
        const nextLiveTable =
          await fetchTableById(tableId);
        const approvedPlayers =
          (nextLiveTable?.players ?? [])
            .filter((player) => player.status === "approved" || player.status === "seated")
            .sort((left, right) => (left.seatNumber ?? 99) - (right.seatNumber ?? 99));
        const runtimePlayers =
          approvedPlayers.map(mapLivePlayerToRuntimePlayer);
        const firstPlayerId =
          runtimePlayers[0]?.id ?? "";
        const selectedLivePlayerId =
          runtimePlayers.some((player) => player.id === urlPlayerId) ?
            urlPlayerId :
            firstPlayerId;

        if (!isMounted) {
          return;
        }

        const currentState =
          runtimeRef.current.getState();
        const currentPlayerSignature =
          currentState.players.map((player) => `${player.id}:${player.wallet}`).join("|");
        const nextPlayerSignature =
          runtimePlayers.map((player) => `${player.id}:${player.wallet}`).join("|");
        const shouldResetRuntime =
          !currentState.table.running && currentPlayerSignature !== nextPlayerSignature;

        if (shouldResetRuntime) {
          runtimeRef.current = new PaseCasinoDemoRuntime({
            players: runtimePlayers,
            table: {
              id: nextLiveTable.id,
              name: nextLiveTable.name,
              code: nextLiveTable.code,
            },
          });
        }

        setLiveTable(nextLiveTable);
        if (shouldResetRuntime) {
          setSelectedShooter(firstPlayerId);
          setSelectedQuickBetPlayer(selectedLivePlayerId);
          setGameState({ ...runtimeRef.current.getState() });
        } else if (currentState.table.running && !savingSnapshotRef.current) {
          const mergedState =
            mergeAdminWalletLoads(currentState, runtimePlayers);

          if (mergedState !== currentState) {
            updateState(mergedState);
          }
        }
        setLiveTableStatus(
          runtimePlayers.length > 0 ?
            "Mesa real lista" :
            "Mesa libre: esperando jugadores aprobados"
        );
      } catch (error) {
        if (isMounted) {
          setLiveTableStatus(`No se pudo cargar la mesa: ${error.message}`);
        }
      }
    };

    loadLiveTable();
    const refreshTimerId =
      window.setInterval(loadLiveTable, 8000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimerId);
    };
  }, [tableId, urlPlayerId]);

  useEffect(() => {
    if (!tableId) {
      return undefined;
    }

    let isMounted = true;

    const syncSnapshot = async () => {
      if (isRolling || savingSnapshotRef.current) {
        return;
      }

      try {
        const snapshot =
          await fetchGameSnapshot(tableId);

        if (!isMounted || !snapshot?.state) {
          return;
        }

        const snapshotSignature =
          JSON.stringify(snapshot.state);

        if (snapshotSignature === lastSnapshotSignatureRef.current) {
          return;
        }

        lastSnapshotSignatureRef.current = snapshotSignature;
        runtimeRef.current.hydrateState(snapshot.state);
        setSelectedShooter(snapshot.state.table?.shooterId ?? "");
        setCoverAmount(snapshot.state.table?.mainPot?.requiredCover || mainPotAmount);
        setGameState({
          ...snapshot.state,
        });
      } catch (error) {
        if (isMounted) {
          setLiveTableStatus(`No se pudo actualizar la mesa: ${error.message}`);
        }
      }
    };

    syncSnapshot();
    const snapshotTimerId =
      window.setInterval(syncSnapshot, 700);

    return () => {
      isMounted = false;
      window.clearInterval(snapshotTimerId);
    };
  }, [isRolling, mainPotAmount, tableId]);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", syncFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreen);
      clearTimeout(rollTimerRef.current);
      clearInterval(rollIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!remoteRolling || isRolling) {
      return undefined;
    }

    rollIntervalRef.current = setInterval(() => {
      setRollingDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 70);

    return () => clearInterval(rollIntervalRef.current);
  }, [isRolling, remoteRolling]);

  useEffect(() => {
    if (quickBetPhase === "READY" || isRolling) {
      return undefined;
    }

    const timerId = window.setTimeout(() => {
      setQuickBetSeconds((seconds) => {
        if (seconds > 1) {
          return seconds - 1;
        }

        if (quickBetPhase === "BETTING") {
          updateState(runtime.closeQuickBetting());
          setQuickBetPhase("BALANCING");
          return 5;
        }

        setQuickBetPhase("READY");
        return 0;
      });
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isRolling, quickBetPhase, quickBetSeconds, runtime]);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  };

  const rollWithAnimation = () => {
    if (
      isRolling ||
      quickBetPhase !== "READY" ||
      table.mainPot.status !== "COPADO" ||
      currentPlayerId !== table.shooterId
    ) {
      return;
    }

    updateState(runtime.closeQuickBetting());
    const rollingState = runtime.getState();
    updateState({
      ...rollingState,
      table: {
        ...rollingState.table,
        phase: "ROLLING_DICE",
      },
      dice: {
        values: [],
        total: null,
        outcome: null,
        finished: false,
      },
    });
    const nextState =
      runtime.rollDice();
    setIsRolling(true);
    setRollingDice([1, 1]);

    rollIntervalRef.current = setInterval(() => {
      setRollingDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 70);

    rollTimerRef.current = setTimeout(() => {
      clearInterval(rollIntervalRef.current);
      setRollingDice(nextState.dice.values);
      updateState(nextState);
      if (nextState.dice.outcome) {
        resetQuickBetWindow();
      }
      setIsRolling(false);
    }, 3000);
  };

  const confirmQuickBet = () => {
    const quickBetAmount =
      Number(selectedAmount) || 0;
    const player =
      players.find((item) => item.id === currentPlayerId);

    if (
      !currentPlayerId ||
      !player ||
      quickBetPhase !== "BETTING" ||
      quickBetAmount < 1000 ||
      quickBetAmount > player.wallet
    ) {
      return;
    }

    updateState(runtime.placeQuickBet({
      playerId: currentPlayerId,
      selection: selectedBet,
      amount: quickBetAmount,
    }));
  };

  const startTableRound = () => {
    if (players.length === 0) {
      return;
    }

    resetQuickBetWindow();
    updateState(runtime.startTable());
  };

  const startNextRound = () => {
    resetQuickBetWindow();
    updateState(runtime.nextRound());
  };

  const selectShooter = (playerId) => {
    if (!playerId) {
      return;
    }

    setSelectedShooter(playerId);

    updateState(runtime.selectShooter(playerId));
  };

  const setShooterStake = () => {
    if (!selectedShooter || (isLivePlayer && currentPlayerId !== table.shooterId)) {
      return;
    }

    const amount = Math.max(20000, mainPotAmount);
    setMainPotAmount(amount);
    setCoverAmount(amount);
    updateState(runtime.setShooterStake(amount));
  };

  const coverMainPot = () => {
    const amount = Math.max(
      Math.min(coverAmount, table.mainPot.requiredCover || coverAmount)
    );
    const nextState = runtime.coverMainPot(currentPlayerId, amount);
    setCoverAmount(nextState.table.mainPot.requiredCover || mainPotAmount);
    updateState(nextState);
  };

  const passMainPotCoverage = () => {
    const nextState = runtime.passMainPotCoverage(currentPlayerId);
    setCoverAmount(nextState.table.mainPot.requiredCover || mainPotAmount);
    updateState(nextState);
  };

  const acceptShooterTurn = () => {
    updateState(runtime.acceptShooterTurn());
  };

  const passShooterTurn = () => {
    const nextState =
      runtime.passShooterTurn();
    setSelectedShooter(nextState.table.shooterId ?? "");
    updateState(nextState);
  };

  return (
    <main className="casino-screen">
      <div className="casino-shell">
        <header className="casino-header">
          <div className="casino-brand">
            <div className="casino-logo">P</div>
            <div>
              <div className="casino-brand-title">Play<span>Platform</span></div>
              <div className="casino-brand-subtitle">Juega. Apuesta. Gana.</div>
            </div>
          </div>
          <div className="casino-table-status">
            <span className="casino-status-dot" />
            Mesa: {liveTable?.name ?? table.tableName ?? `Pase VIP #${table.round}`}
            <span style={{ color: "#34d399" }}>{table.running ? "En curso" : "Lista"}</span>
          </div>
          <div className="casino-header-actions">
            <button type="button" className="casino-small-button">Como se juega</button>
            <button
              type="button"
              className="casino-small-button"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? "Salir pantalla completa" : "Pantalla completa"}
            </button>
            <div className="casino-wallet">
              <strong>{accountPlayer?.name ?? "RRVisionHD"}</strong>
              <span>{formatMoney(accountPlayer?.wallet ?? 0)} Gs</span>
            </div>
          </div>
        </header>

        {tableId && liveTableStatus && liveTableStatus !== "Mesa real lista" && (
          <div className="casino-live-table-notice">
            {liveTableStatus}
          </div>
        )}

        <section className="casino-layout">
          <LeftPanel
            table={table}
            selectedBet={selectedBet}
            selectedAmount={selectedAmount}
            quickBetPhase={quickBetPhase}
            quickBetSeconds={quickBetSeconds}
            canConfirmQuickBet={canConfirmQuickBet}
            onSelectBet={setSelectedBet}
            onSelectAmount={setSelectedAmount}
            onConfirmBet={confirmQuickBet}
          />
          <div className="casino-center-frame">
            <GameTable
              table={table}
              players={players}
              dice={dice}
              rollingDice={rollingDice}
              isRolling={isRolling || remoteRolling}
              selectedShooter={selectedShooter}
              mainPotAmount={mainPotAmount}
              coverAmount={coverAmount}
              onSelectShooter={selectShooter}
              onSelectMainPotAmount={setMainPotAmount}
              onSetShooterStake={setShooterStake}
              onCoverMainPot={coverMainPot}
              onPassMainPotCoverage={passMainPotCoverage}
              onSelectCoverAmount={setCoverAmount}
              currentPlayerId={currentPlayerId}
            />
            <BottomBar
              table={table}
              players={players}
              isRolling={isRolling || remoteRolling}
              selectedBet={selectedBet}
              selectedAmount={selectedAmount}
              currentPlayerId={currentPlayerId}
              isLivePlayer={isLivePlayer}
              mainPotAmount={mainPotAmount}
              coverAmount={coverAmount}
              quickBetPhase={quickBetPhase}
              quickBetSeconds={quickBetSeconds}
              onSelectMainPotAmount={setMainPotAmount}
              onSetShooterStake={setShooterStake}
              onSelectCoverAmount={setCoverAmount}
              onCoverMainPot={coverMainPot}
              onPassMainPotCoverage={passMainPotCoverage}
              onAcceptShooterTurn={acceptShooterTurn}
              onPassShooterTurn={passShooterTurn}
              onRoll={rollWithAnimation}
            />
          </div>
          <RightPanel table={table} players={players} phase={phase} history={history} />
        </section>
      </div>
    </main>
  );
}

export {
  PlayPlatformCasinoExperience,
};

export default PlayPlatformCasinoExperience;
