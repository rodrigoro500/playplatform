import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  formatMoney,
} from "../games/Pase/ui/PaseCasinoDemoRuntime";
import {
  adjustBalanceLoaderCredit,
  approvePlayerChips,
  createPlatformAccount,
  createInvite,
  createTable,
  deletePlayer,
  fetchPlatformAccounts,
  fetchTables,
  hasSupabaseConfig,
  updatePlatformAccountStatus,
  updatePlayerVoice,
} from "../lib/playPlatformDataService";
import "./PlayPlatformAdminPanel.css";

function getPublicAppOrigin() {
  const configuredOrigin =
    import.meta.env.VITE_PUBLIC_APP_URL;

  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, "");
  }

  if (window.location.hostname === "localhost") {
    return window.location.origin;
  }

  return "https://playplatform.vercel.app";
}

function createWhatsappLink(inviteCode) {
  const inviteLink =
    `${getPublicAppOrigin()}/join?invite=${inviteCode}`;
  const message =
    `Te invito a la mesa de PASE en PlayPlatform: ${inviteLink}`;

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

function createTableLink(tableId) {
  return tableId ? `${getPublicAppOrigin()}/?table=${tableId}` : "/";
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

function getRoleLabel(role) {
  const labels = {
    balance_loader: "Cargador",
    player: "Jugador",
    super_admin: "Super Admin",
  };

  return labels[role] ?? role;
}

function getAccountStatusLabel(status) {
  const labels = {
    active: "Activo",
    suspended: "Suspendido",
  };

  return labels[status] ?? status;
}

function sumWalletCredits(transactions = []) {
  return transactions
    .filter((transaction) => (
      transaction.transaction_type === "credit" &&
      transaction.reference_type === "admin_chip_load"
    ))
    .reduce((total, transaction) => total + (Number(transaction.amount) || 0), 0);
}

function sumCommissionTransactions(transactions = []) {
  return transactions
    .filter((transaction) => (
      transaction.transaction_type === "commission" ||
      transaction.reference_type === "commission" ||
      transaction.reference_type === "table_commission"
    ))
    .reduce((total, transaction) => total + Math.abs(Number(transaction.amount) || 0), 0);
}

function getActiveQuickBetTotal(snapshot) {
  return (snapshot?.table?.betFeed ?? [])
    .filter((bet) => bet.status === "CONFIRMADA")
    .reduce((total, bet) => total + (Number(bet.amount) || 0), 0);
}

function getActiveMainPotTotal(snapshot) {
  const mainPot =
    snapshot?.table?.mainPot;

  if (!mainPot || mainPot.status === "ESPERANDO_TIRADOR" || mainPot.status === "PREGUNTAR_TIRADOR") {
    return 0;
  }

  return Number(mainPot.total) || 0;
}

function buildChipAudit(table, freeChips) {
  const transactions =
    table?.transactions ?? [];
  const snapshot =
    table?.gameSnapshot ?? null;
  const loadedChips =
    sumWalletCredits(transactions);
  const commissionChips =
    sumCommissionTransactions(transactions);
  const lockedMainPot =
    getActiveMainPotTotal(snapshot);
  const lockedQuickBets =
    getActiveQuickBetTotal(snapshot);
  const lockedChips =
    lockedMainPot + lockedQuickBets;
  const auditedChips =
    freeChips + lockedChips + commissionChips;
  const difference =
    auditedChips - loadedChips;

  return {
    auditedChips,
    commissionChips,
    difference,
    freeChips,
    loadedChips,
    lockedChips,
    lockedMainPot,
    lockedQuickBets,
    ok: Math.abs(difference) === 0,
  };
}

function PlayPlatformAdminPanel() {
  const [tables, setTables] = useState([]);
  const [platformAccounts, setPlatformAccounts] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [adminView, setAdminView] = useState("tables");
  const [newTableName, setNewTableName] = useState("Pase VIP");
  const [newTableGameType, setNewTableGameType] = useState("PASE");
  const [chipAmount, setChipAmount] = useState(50000);
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [accountRole, setAccountRole] = useState("balance_loader");
  const [accountCreditLimit, setAccountCreditLimit] = useState(500000);
  const [creditTopUpAmount, setCreditTopUpAmount] = useState(100000);
  const [loading, setLoading] = useState(true);
  const [accountsLoading, setAccountsLoading] = useState(true);
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
  const chipAudit =
    useMemo(() => buildChipAudit(selectedTable, totalChips), [selectedTable, totalChips]);
  const accountSummary =
    useMemo(() => ({
      superAdmins: platformAccounts.filter((account) => account.role === "super_admin").length,
      balanceLoaders: platformAccounts.filter((account) => account.role === "balance_loader").length,
      players: platformAccounts.filter((account) => account.role === "player").length,
      availableCredit: platformAccounts.reduce((total, account) => total + (Number(account.availableCredit) || 0), 0),
    }), [platformAccounts]);

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

  const loadPlatformAccounts = async ({
    silent = false,
  } = {}) => {
    if (!silent) {
      setAccountsLoading(true);
    }

    try {
      const nextAccounts =
        await fetchPlatformAccounts();
      setPlatformAccounts(nextAccounts);
    } catch (error) {
      if (!silent) {
        setMessage(
          `No se pudieron cargar cuentas Super Admin: ${error.message}. Ejecuta el SQL actualizado en Supabase.`
        );
      }
    } finally {
      if (!silent) {
        setAccountsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadTables();
    loadPlatformAccounts();
    const refreshTimerId =
      window.setInterval(() => {
        loadTables({
          silent: true,
        });
        loadPlatformAccounts({
          silent: true,
        });
      }, 4000);

    return () => window.clearInterval(refreshTimerId);
  }, []);

  const handleCreateTable = async () => {
    setSaving(true);
    setMessage("");

    try {
      const table =
        await createTable(newTableName, newTableGameType);
      await loadTables();
      setSelectedTableId(table.id);
      setMessage("Mesa creada correctamente.");
    } catch (error) {
      setMessage(`No se pudo crear la mesa: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateAccount = async () => {
    setSaving(true);
    setMessage("");

    try {
      await createPlatformAccount({
        displayName: accountName,
        email: accountEmail,
        role: accountRole,
        creditLimit: accountCreditLimit,
      });
      setAccountName("");
      setAccountEmail("");
      setAccountCreditLimit(500000);
      await loadPlatformAccounts();
      setMessage("Cuenta operativa creada correctamente.");
    } catch (error) {
      setMessage(`No se pudo crear la cuenta: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAccountStatus = async (account) => {
    setSaving(true);
    setMessage("");

    try {
      await updatePlatformAccountStatus(
        account.id,
        account.status === "active" ? "suspended" : "active"
      );
      await loadPlatformAccounts();
      setMessage("Estado de cuenta actualizado.");
    } catch (error) {
      setMessage(`No se pudo actualizar la cuenta: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleTopUpLoader = async (account) => {
    setSaving(true);
    setMessage("");

    try {
      await adjustBalanceLoaderCredit(account.id, creditTopUpAmount);
      await loadPlatformAccounts();
      setMessage("Credito operativo agregado al cargador.");
    } catch (error) {
      setMessage(`No se pudo agregar credito: ${error.message}`);
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

  const handleDeletePlayer = async (player) => {
    const confirmed =
      window.confirm(`Eliminar a ${player.name} de la mesa?`);

    if (!confirmed) {
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await deletePlayer(player.id);
      await loadTables();
      setMessage("Jugador eliminado correctamente.");
    } catch (error) {
      setMessage(`No se pudo eliminar al jugador: ${error.message}`);
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
          <div className="admin-header-actions">
            <button
              type="button"
              className={adminView === "tables" ? "is-active" : ""}
              onClick={() => setAdminView("tables")}
            >
              Mesas
            </button>
            <button
              type="button"
              className={adminView === "super" ? "is-active" : ""}
              onClick={() => setAdminView("super")}
            >
              Super Admin
            </button>
            <a href={createTableLink(selectedTable?.id)} className="admin-header-link">
              Ir a la mesa
            </a>
          </div>
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

        {adminView === "super" ? (
          <section className="admin-layout admin-super-layout">
            <aside className="admin-sidebar">
              <div className="admin-card">
                <h2>Crear cuenta</h2>
                <label>
                  Nombre
                  <input
                    value={accountName}
                    onChange={(event) => setAccountName(event.target.value)}
                    placeholder="Ej: Cargador Centro"
                    disabled={saving}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                    placeholder="usuario@play.com"
                    disabled={saving}
                  />
                </label>
                <label>
                  Rol
                  <select
                    value={accountRole}
                    onChange={(event) => setAccountRole(event.target.value)}
                    disabled={saving}
                  >
                    <option value="balance_loader">Cargador de saldo</option>
                    <option value="player">Jugador</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </label>
                {accountRole === "balance_loader" && (
                  <label>
                    Credito operativo
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={accountCreditLimit}
                      onChange={(event) => setAccountCreditLimit(Number(event.target.value))}
                      disabled={saving}
                    />
                  </label>
                )}
                <button type="button" onClick={handleCreateAccount} disabled={saving}>
                  Crear cuenta
                </button>
              </div>

              <div className="admin-card">
                <h2>Recargar cargador</h2>
                <label>
                  Monto
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={creditTopUpAmount}
                    onChange={(event) => setCreditTopUpAmount(Number(event.target.value))}
                    disabled={saving}
                  />
                </label>
              </div>
            </aside>

            <section className="admin-main">
              <div className="admin-summary">
                <div>
                  <span>Super Admins</span>
                  <strong>{accountSummary.superAdmins}</strong>
                </div>
                <div>
                  <span>Cargadores</span>
                  <strong>{accountSummary.balanceLoaders}</strong>
                </div>
                <div>
                  <span>Usuarios</span>
                  <strong>{accountSummary.players}</strong>
                </div>
                <div>
                  <span>Credito disponible</span>
                  <strong>{formatMoney(accountSummary.availableCredit)} Gs</strong>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-head">
                  <h2>Cuentas operativas</h2>
                  <span>{accountsLoading ? "Cargando..." : `${platformAccounts.length} cuentas`}</span>
                </div>
                <div className="admin-account-list">
                  {platformAccounts.length === 0 && (
                    <span>No hay cuentas operativas creadas.</span>
                  )}
                  {platformAccounts.map((account) => (
                    <article key={account.id} className="admin-account-row">
                      <div className={`admin-role-badge role-${account.role}`}>
                        {getRoleLabel(account.role).slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong>{account.displayName}</strong>
                        <span>{account.email}</span>
                      </div>
                      <div>
                        <small>Rol</small>
                        <strong>{getRoleLabel(account.role)}</strong>
                      </div>
                      <div>
                        <small>Estado</small>
                        <strong>{getAccountStatusLabel(account.status)}</strong>
                      </div>
                      <div>
                        <small>Credito disponible</small>
                        <strong>{formatMoney(account.availableCredit)} Gs</strong>
                      </div>
                      <div className="admin-row-actions">
                        {account.role === "balance_loader" && (
                          <button type="button" onClick={() => handleTopUpLoader(account)} disabled={saving}>
                            Agregar credito
                          </button>
                        )}
                        <button type="button" onClick={() => handleToggleAccountStatus(account)} disabled={saving}>
                          {account.status === "active" ? "Suspender" : "Activar"}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </section>
        ) : (
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
              <label>
                Juego
                <select
                  value={newTableGameType}
                  onChange={(event) => setNewTableGameType(event.target.value)}
                >
                  <option value="PASE">PASE</option>
                  <option value="MAKAI">MAKAI</option>
                </select>
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
                    <span>{table.gameType ?? "PASE"}</span>
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
                <span>Saldos libres</span>
                <strong>{formatMoney(totalChips)} Gs</strong>
              </div>
              <div>
                <span>Pozo minimo</span>
                <strong>{formatMoney(selectedTable?.minPot ?? 20000)} Gs</strong>
              </div>
            </div>

            <div className={`admin-chip-audit ${chipAudit.ok ? "is-ok" : "is-error"}`}>
              <div className="admin-chip-audit-head">
                <div>
                  <span>Control de fichas</span>
                  <strong>{chipAudit.ok ? "Mesa cuadrada" : "Diferencia detectada"}</strong>
                </div>
                <strong className={chipAudit.difference === 0 ? "" : "is-different"}>
                  {chipAudit.difference > 0 ? "+" : ""}
                  {formatMoney(chipAudit.difference)} Gs
                </strong>
              </div>
              <div className="admin-chip-audit-grid">
                <div>
                  <span>Cargadas por Admin</span>
                  <strong>{formatMoney(chipAudit.loadedChips)} Gs</strong>
                </div>
                <div>
                  <span>Saldos libres</span>
                  <strong>{formatMoney(chipAudit.freeChips)} Gs</strong>
                </div>
                <div>
                  <span>En juego</span>
                  <strong>{formatMoney(chipAudit.lockedChips)} Gs</strong>
                </div>
                <div>
                  <span>Comisiones</span>
                  <strong>{formatMoney(chipAudit.commissionChips)} Gs</strong>
                </div>
              </div>
              <p>
                En juego: pozo {formatMoney(chipAudit.lockedMainPot)} Gs + jugadas rapidas {formatMoney(chipAudit.lockedQuickBets)} Gs.
              </p>
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
                      <button type="button" onClick={() => handleDeletePlayer(player)} disabled={saving}>
                        Eliminar jugador
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
        )}
      </section>
    </main>
  );
}

export default PlayPlatformAdminPanel;
