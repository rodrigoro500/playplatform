import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  formatMoney,
} from "../games/Pase/ui/PaseCasinoDemoRuntime";
import {
  approvePlayerChips,
  createInvite,
  createTable,
  fetchTables,
  hasSupabaseConfig,
  updatePlayerVoice,
} from "../lib/playPlatformDataService";
import "./PlayPlatformAdminPanel.css";

function createWhatsappLink(inviteCode) {
  const inviteLink =
    `${window.location.origin}/join?invite=${inviteCode}`;
  const message =
    `Te invito a la mesa de PASE en PlayPlatform: ${inviteLink}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function createTableLink(tableId) {
  return tableId ? `/?table=${tableId}` : "/";
}

function getStatusLabel(status) {
  const labels = {
    approved: "Aprobado",
    claimed: "Registrado",
    invited: "Invitado",
    open: "Abierta",
    pending: "Pendiente",
    pending_approval: "Pendiente",
    seated: "Sentado",
  };

  return labels[status] ?? status;
}

function PlayPlatformAdminPanel() {
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [newTableName, setNewTableName] = useState("Pase VIP");
  const [chipAmount, setChipAmount] = useState(50000);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const selectedTable =
    tables.find((table) => table.id === selectedTableId) ?? tables[0] ?? null;
  const approvedPlayers =
    selectedTable?.players.filter((player) => player.status === "approved" || player.status === "seated") ?? [];
  const pendingPlayers =
    selectedTable?.players.filter((player) => player.status !== "approved" && player.status !== "seated") ?? [];
  const pendingInvites =
    selectedTable?.invites.filter((invite) => invite.status === "pending") ?? [];
  const totalChips =
    useMemo(() => (selectedTable?.players ?? []).reduce(
      (total, player) => total + player.chips,
      0
    ), [selectedTable?.players]);

  const loadTables = async ({
    silent = false,
  } = {}) => {
    if (!silent) {
      setLoading(true);
      setMessage("");
    }

    try {
      const nextTables =
        await fetchTables();
      setTables(nextTables);
      setSelectedTableId((currentTableId) => (
        nextTables.some((table) => table.id === currentTableId) ?
          currentTableId :
          nextTables[0]?.id ?? null
      ));
    } catch (error) {
      if (!silent) {
        setMessage(`No se pudo cargar Supabase: ${error.message}`);
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadTables();
    const refreshTimerId =
      window.setInterval(() => loadTables({
        silent: true,
      }), 4000);

    return () => window.clearInterval(refreshTimerId);
  }, []);

  const handleCreateTable = async () => {
    setSaving(true);
    setMessage("");

    try {
      const table =
        await createTable(newTableName);
      await loadTables();
      setSelectedTableId(table.id);
      setMessage("Mesa creada correctamente.");
    } catch (error) {
      setMessage(`No se pudo crear la mesa: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateInvite = async () => {
    if (!selectedTable) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await createInvite(selectedTable.id);
      await loadTables();
      setMessage("Invitacion creada. Ya puedes enviarla por WhatsApp.");
    } catch (error) {
      setMessage(`No se pudo crear la invitacion: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleApprovePlayer = async (playerId) => {
    if (!selectedTable) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await approvePlayerChips(playerId, selectedTable.id, chipAmount);
      await loadTables();
      setMessage("Fichas aprobadas y cargadas.");
    } catch (error) {
      setMessage(`No se pudieron aprobar fichas: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleMute = async (player) => {
    setSaving(true);
    setMessage("");

    try {
      await updatePlayerVoice(player.id, !player.muted);
      await loadTables();
    } catch (error) {
      setMessage(`No se pudo cambiar el microfono: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="admin-screen">
      <section className="admin-shell">
        <header className="admin-header">
          <div>
            <span>Panel administrativo</span>
            <h1>PlayPlatform</h1>
          </div>
          <a href={createTableLink(selectedTable?.id)} className="admin-header-link">
            Ir a la mesa
          </a>
        </header>

        {!hasSupabaseConfig && (
          <div className="admin-alert">
            Falta configurar Supabase en Vercel.
          </div>
        )}

        {message && (
          <div className="admin-alert">
            {message}
          </div>
        )}

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
              <button type="button" onClick={handleCreateTable} disabled={saving}>
                Crear mesa
              </button>
            </div>

            <div className="admin-card">
              <h2>Mesas</h2>
              <div className="admin-table-list">
                {loading && <span>Cargando mesas...</span>}
                {!loading && tables.length === 0 && <span>No hay mesas creadas.</span>}
                {tables.map((table) => (
                  <button
                    key={table.id}
                    type="button"
                    onClick={() => setSelectedTableId(table.id)}
                    className={table.id === selectedTable?.id ? "is-active" : ""}
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
                <strong>{selectedTable?.name ?? "Sin mesa"}</strong>
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
                <strong>{formatMoney(selectedTable?.minPot ?? 20000)} Gs</strong>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-head">
                <h2>Invitar jugador</h2>
                <span>Link listo para WhatsApp</span>
              </div>
              <div className="admin-inline-form">
                <input
                  value={selectedTable?.name ?? ""}
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleCreateInvite}
                  disabled={saving || !selectedTable}
                >
                  Crear invitacion
                </button>
                <a
                  href={createTableLink(selectedTable?.id)}
                  className="admin-header-link"
                >
                  Abrir mesa
                </a>
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
                {(selectedTable?.players ?? []).length === 0 && (
                  <span>No hay jugadores registrados todavia.</span>
                )}
                {(selectedTable?.players ?? []).map((player) => (
                  <article key={player.id} className="admin-player-row">
                    <div className="admin-avatar">
                      {player.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <strong>{player.name}</strong>
                      <span>{getStatusLabel(player.status)}</span>
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
                      <button type="button" onClick={() => handleApprovePlayer(player.id)} disabled={saving}>
                        Cargar fichas
                      </button>
                      <button type="button" onClick={() => handleToggleMute(player)} disabled={saving}>
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
                El estado de microfono ya se guarda en Supabase. En la siguiente fase se conecta
                la sala de audio real con permisos de dispositivo.
              </p>
            </div>
          </section>

          <aside className="admin-sidebar">
            <div className="admin-card">
              <h2>Invitaciones</h2>
              <div className="admin-pending-list">
                {pendingInvites.length === 0 && (
                  <span>No hay invitaciones pendientes.</span>
                )}
                {pendingInvites.map((invite) => (
                  <div key={invite.id}>
                    <strong>{invite.invite_code}</strong>
                    <a
                      href={createWhatsappLink(invite.invite_code)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-card">
              <h2>Pendientes</h2>
              <div className="admin-pending-list">
                {pendingPlayers.length === 0 && (
                  <span>No hay jugadores pendientes.</span>
                )}
                {pendingPlayers.map((player) => (
                  <div key={player.id}>
                    <strong>{player.name}</strong>
                    <span>{getStatusLabel(player.status)}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformAdminPanel;
