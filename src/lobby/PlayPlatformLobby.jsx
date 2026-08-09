import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  formatMoney,
} from "../games/Pase/ui/PaseCasinoDemoRuntime";
import {
  fetchTables,
  hasSupabaseConfig,
} from "../lib/playPlatformDataService";
import "./PlayPlatformLobby.css";

const games = [
  {
    id: "PASE",
    name: "PASE",
    status: "Disponible",
    description: "Mesas activas con pozo, punto, MONO y voz en vivo.",
  },
  {
    id: "MAKAI",
    name: "MAKAI",
    status: "Proximamente",
    description: "Nuevo juego en preparacion.",
  },
  {
    id: "BOJO",
    name: "BOJO",
    status: "Proximamente",
    description: "Nuevo juego en preparacion.",
  },
  {
    id: "BINGO",
    name: "BINGO",
    status: "Proximamente",
    description: "Salas de bingo para proximas versiones.",
  },
  {
    id: "POKER",
    name: "POKER",
    status: "Proximamente",
    description: "Mesas de poker para proximas versiones.",
  },
];

function createTableLink(tableId) {
  return tableId ? `/?table=${tableId}` : "/";
}

function getTableStatusLabel(status) {
  const labels = {
    open: "Abierta",
    active: "En curso",
    closed: "Cerrada",
  };

  return labels[status] ?? status ?? "Lista";
}

function PlayPlatformLobby() {
  const [selectedGameId, setSelectedGameId] = useState("PASE");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const selectedGame =
    games.find((game) => game.id === selectedGameId) ?? games[0];
  const paseTables =
    useMemo(() => tables.filter((table) => table.status !== "closed"), [tables]);

  useEffect(() => {
    let isMounted = true;

    const loadTables = async () => {
      if (!hasSupabaseConfig) {
        setMessage("Falta configurar Supabase.");
        setLoading(false);
        return;
      }

      try {
        const nextTables =
          await fetchTables();

        if (isMounted) {
          setTables(nextTables);
          setMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setMessage(`No se pudieron cargar las mesas: ${error.message}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTables();
    const refreshTimerId =
      window.setInterval(loadTables, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(refreshTimerId);
    };
  }, []);

  return (
    <main className="lobby-screen">
      <section className="lobby-shell">
        <header className="lobby-header">
          <div className="lobby-brand">
            <div className="lobby-logo">P</div>
            <div>
              <h1>PlayPlatform</h1>
              <span>Elige un juego y entra a una mesa</span>
            </div>
          </div>
          <a href="/admin" className="lobby-admin-link">
            Admin
          </a>
        </header>

        {message && (
          <div className="lobby-alert">
            {message}
          </div>
        )}

        <section className="lobby-layout">
          <div className="lobby-games">
            {games.map((game) => (
              <button
                key={game.id}
                type="button"
                className={game.id === selectedGameId ? "is-selected" : ""}
                onClick={() => setSelectedGameId(game.id)}
              >
                <span>{game.status}</span>
                <strong>{game.name}</strong>
                <small>{game.description}</small>
              </button>
            ))}
          </div>

          <section className="lobby-tables">
            <div className="lobby-section-head">
              <div>
                <span>Juego seleccionado</span>
                <h2>{selectedGame.name}</h2>
              </div>
              <strong>{selectedGame.status}</strong>
            </div>

            {selectedGame.id !== "PASE" ? (
              <div className="lobby-empty">
                <strong>{selectedGame.name} todavia no esta disponible.</strong>
                <span>Por ahora puedes jugar PASE.</span>
              </div>
            ) : (
              <div className="lobby-table-list">
                {loading && (
                  <div className="lobby-empty">
                    Cargando mesas...
                  </div>
                )}

                {!loading && paseTables.length === 0 && (
                  <div className="lobby-empty">
                    <strong>No hay mesas creadas.</strong>
                    <span>Crea una mesa desde Admin.</span>
                  </div>
                )}

                {paseTables.map((table) => {
                  const players =
                    table.players.filter((player) => player.status === "approved" || player.status === "seated");
                  const freeChips =
                    players.reduce((total, player) => total + player.chips, 0);

                  return (
                    <article key={table.id} className="lobby-table-card">
                      <div>
                        <span>{getTableStatusLabel(table.status)}</span>
                        <h3>{table.name}</h3>
                        <p>{players.length} jugadores aprobados</p>
                      </div>
                      <div className="lobby-table-stats">
                        <span>Pozo minimo</span>
                        <strong>{formatMoney(table.minPot ?? 20000)} Gs</strong>
                      </div>
                      <div className="lobby-table-stats">
                        <span>Saldos libres</span>
                        <strong>{formatMoney(freeChips)} Gs</strong>
                      </div>
                      <a href={createTableLink(table.id)}>
                        Entrar
                      </a>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </section>
      </section>
    </main>
  );
}

export default PlayPlatformLobby;
