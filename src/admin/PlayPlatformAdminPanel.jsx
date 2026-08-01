import {
  useMemo,
  useState,
} from "react";
import {
  formatMoney,
} from "../games/Pase/ui/PaseCasinoDemoRuntime";
import "./PlayPlatformAdminPanel.css";

const initialTables = [
  {
    id: "pase-vip-1024",
    name: "Pase VIP #1024",
    status: "Abierta",
    minPot: 20000,
    players: [
      {
        id: "P1",
        name: "Carlos89",
        requestedChips: 100000,
        chips: 100000,
        status: "Aprobado",
        muted: false,
      },
      {
        id: "P2",
        name: "LuisMG",
        requestedChips: 50000,
        chips: 50000,
        status: "Aprobado",
        muted: false,
      },
      {
        id: "P3",
        name: "Pendiente",
        requestedChips: 0,
        chips: 0,
        status: "Invitado",
        muted: true,
      },
    ],
  },
];

function createInviteLink(tableId, playerId) {
  return `${window.location.origin}/?table=${tableId}&player=${playerId}`;
}

function createWhatsappLink(tableId, playerId) {
  const inviteLink =
    createInviteLink(tableId, playerId);
  const message =
    `Te invito a la mesa de PASE en PlayPlatform: ${inviteLink}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function PlayPlatformAdminPanel() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTableId, setSelectedTableId] = useState(initialTables[0].id);
  const [newTableName, setNewTableName] = useState("Pase VIP");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [chipAmount, setChipAmount] = useState(50000);
  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? tables[0];
  const approvedPlayers =
    selectedTable.players.filter((player) => player.status === "Aprobado");
  const pendingPlayers =
    selectedTable.players.filter((player) => player.status !== "Aprobado");
  const totalChips =
    useMemo(() => selectedTable.players.reduce(
      (total, player) => total + player.chips,
      0
    ), [selectedTable.players]);

  const updateSelectedTable = (updater) => {
    setTables((currentTables) => currentTables.map((table) => (
      table.id === selectedTable.id ? updater(table) : table
    )));
  };

  const createTable = () => {
    const tableNumber =
      Math.floor(1000 + Math.random() * 9000);
    const table = {
      id: `pase-vip-${tableNumber}`,
      name: `${newTableName || "Pase VIP"} #${tableNumber}`,
      status: "Abierta",
      minPot: 20000,
      players: [],
    };

    setTables((currentTables) => [
      table,
      ...currentTables,
    ]);
    setSelectedTableId(table.id);
  };

  const invitePlayer = () => {
    const playerNumber =
      selectedTable.players.length + 1;
    const player = {
      id: `P${playerNumber}`,
      name: newPlayerName.trim() || "Pendiente",
      requestedChips: 0,
      chips: 0,
      status: "Invitado",
      muted: true,
    };

    updateSelectedTable((table) => ({
      ...table,
      players: [
        ...table.players,
        player,
      ],
    }));
    setNewPlayerName("");
  };

  const approvePlayer = (playerId) => {
    const chips =
      Math.max(0, Number(chipAmount) || 0);

    updateSelectedTable((table) => ({
      ...table,
      players: table.players.map((player) => (
        player.id === playerId ?
          {
            ...player,
            requestedChips: chips,
            chips,
            status: "Aprobado",
          } :
          player
      )),
    }));
  };

  const toggleMute = (playerId) => {
    updateSelectedTable((table) => ({
      ...table,
      players: table.players.map((player) => (
        player.id === playerId ?
          {
            ...player,
            muted: !player.muted,
          } :
          player
      )),
    }));
  };

  return (
    <main className="admin-screen">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <span>Panel administrativo</span>
            <h1>PlayPlatform</h1>
          </div>
          <a href="/" className="admin-header-link">
            Ir a la mesa
          </a>
        </header>

        <section className="admin-layout">
          <aside className="admin-sidebar">
            <div className="admin-card">
              <h2>Crear mesa</h2>
              <label>
                Nombre
                <input
                  value={newTableName}
                  onChange={(event) => setNewTableName(event.target.value)}
                />
              </label>
              <button type="button" onClick={createTable}>
                Crear mesa
              </button>
            </div>

            <div className="admin-card">
              <h2>Mesas</h2>
              <div className="admin-table-list">
                {tables.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => setSelectedTableId(table.id)}
                    className={table.id === selectedTable.id ? "is-active" : ""}
                  >
                    <strong>{table.name}</strong>
                    <span>{table.players.length} jugadores</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <section className="admin-main">
            <div className="admin-summary">
              <div>
                <span>Mesa activa</span>
                <strong>{selectedTable.name}</strong>
              </div>
              <div>
                <span>Aprobados</span>
                <strong>{approvedPlayers.length}</strong>
              </div>
              <div>
                <span>Fichas cargadas</span>
                <strong>{formatMoney(totalChips)} Gs</strong>
              </div>
              <div>
                <span>Pozo minimo</span>
                <strong>{formatMoney(selectedTable.minPot)} Gs</strong>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-head">
                <h2>Invitar jugador</h2>
                <span>Link listo para WhatsApp</span>
              </div>
              <div className="admin-inline-form">
                <input
                  placeholder="Nombre declarado por el jugador"
                  value={newPlayerName}
                  onChange={(event) => setNewPlayerName(event.target.value)}
                />
                <button type="button" onClick={invitePlayer}>
                  Crear invitacion
                </button>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-head">
                <h2>Solicitudes y saldos</h2>
                <label>
                  Fichas a cargar
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={chipAmount}
                    onChange={(event) => setChipAmount(Number(event.target.value))}
                  />
                </label>
              </div>

              <div className="admin-player-list">
                {selectedTable.players.map((player) => (
                  <article key={player.id} className="admin-player-row">
                    <div className="admin-avatar">
                      {player.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong>{player.name}</strong>
                      <span>{player.status}</span>
                    </div>
                    <div>
                      <small>Fichas</small>
                      <strong>{formatMoney(player.chips)} Gs</strong>
                    </div>
                    <div>
                      <small>Microfono</small>
                      <strong>{player.muted ? "Silenciado" : "Activo"}</strong>
                    </div>
                    <div className="admin-row-actions">
                      <a
                        href={createWhatsappLink(selectedTable.id, player.id)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        WhatsApp
                      </a>
                      <button type="button" onClick={() => approvePlayer(player.id)}>
                        Aprobar fichas
                      </button>
                      <button type="button" onClick={() => toggleMute(player.id)}>
                        {player.muted ? "Activar voz" : "Silenciar"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="admin-card admin-note">
              <h2>Voz entre jugadores</h2>
              <p>
                La mesa queda preparada a nivel de panel para activar o silenciar jugadores.
                Para hablar desde dispositivos reales necesitaremos publicar con HTTPS y conectar
                una sala de audio en tiempo real.
              </p>
            </div>
          </section>

          <aside className="admin-sidebar">
            <div className="admin-card">
              <h2>Pendientes</h2>
              <div className="admin-pending-list">
                {pendingPlayers.length === 0 && (
                  <span>No hay solicitudes pendientes.</span>
                )}
                {pendingPlayers.map((player) => (
                  <div key={player.id}>
                    <strong>{player.name}</strong>
                    <span>{player.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <h2>Siguiente fase</h2>
              <ul className="admin-next-list">
                <li>Registro real del jugador desde el link.</li>
                <li>Panel del administrador en vivo.</li>
                <li>Servidor para sincronizar mesa y saldos.</li>
                <li>Audio con microfono y boton silenciar.</li>
              </ul>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformAdminPanel;
