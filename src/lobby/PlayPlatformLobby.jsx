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
import {
  supabase,
} from "../lib/supabaseClient";
import "./PlayPlatformLobby.css";

const playOriginals = [
  {
    id: "PASE",
    name: "PASE",
    label: "PLAY Original",
    status: "Mesas reales",
    description: "Dados, pozo principal, MONO, punto y copado en vivo.",
    accent: "green",
    image: "/images/pase-promo.png",
  },
  {
    id: "MAKAI",
    name: "MAKAI",
    label: "PLAY Original",
    status: "Mesas reales",
    description: "Cartas espanolas, banca rapida y suma nueve.",
    accent: "gold",
    image: "/images/makai-promo.png",
  },
];

const providerRows = [
  {
    title: "Pragmatic Play",
    provider: "Demo provider",
    accent: "red",
    games: ["Wolf Gold", "Sweet Bonanza", "Gates of Olympus", "Sugar Rush"],
  },
  {
    title: "Amatic",
    provider: "Demo provider",
    accent: "blue",
    games: ["Hot Fruits", "Book of Aztec", "Lucky Bells", "Wild Shark"],
  },
  {
    title: "Wazdan",
    provider: "Demo provider",
    accent: "violet",
    games: ["Magic Stars", "Power of Gods", "Sizzling 777", "Burning Sun"],
  },
];

const categories = [
  ["Slots", "Proveedores demo", "126 juegos"],
  ["Casino en vivo", "Proxima fase", "Ruleta y blackjack"],
  ["PLAY", "Juegos propios", "PASE y MAKAI"],
  ["Promos", "Bonos demo", "Sin dinero real"],
];

function getGameIdFromPath() {
  const match =
    window.location.pathname.match(/^\/games\/([^/]+)/);

  return match?.[1]?.toUpperCase() ?? null;
}

function createGameLink(gameId) {
  return `/games/${gameId.toLowerCase()}`;
}

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

function GameArtwork({
  game,
}) {
  return (
    <div className="casino-game-art">
      {game.image ? (
        <img src={game.image} alt={game.name} />
      ) : (
        <div className={`casino-card-symbol accent-${game.accent}`}>
          {game.name.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

function ProviderGameCard({
  name,
  accent,
}) {
  return (
    <article className={`provider-game-card accent-${accent}`}>
      <div className="provider-game-mark">
        {name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
      </div>
      <strong>{name}</strong>
      <span>Demo</span>
    </article>
  );
}

function PlayPlatformLobby() {
  const routeGameId =
    getGameIdFromPath();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);
  const selectedGame =
    playOriginals.find((game) => game.id === routeGameId) ?? null;
  const selectedGameTables =
    useMemo(() => tables.filter((table) => (
      table.status !== "closed" &&
      (table.gameType ?? "PASE") === (selectedGame?.id ?? "PASE")
    )), [selectedGame?.id, tables]);
  const liveTables =
    useMemo(() => tables.filter((table) => table.status !== "closed"), [tables]);
  const activePlayers =
    liveTables.reduce((total, table) => (
      total + table.players.filter((player) => player.status === "approved" || player.status === "seated").length
    ), 0);
  const totalChips =
    liveTables.reduce((total, table) => (
      total + table.players.reduce((sum, player) => sum + (Number(player.chips) || 0), 0)
    ), 0);

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

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) {
      return undefined;
    }

    let isMounted = true;

    supabase.auth.getSession().then(({
      data,
    }) => {
      if (isMounted) {
        setSession(data.session ?? null);
      }
    });

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  return (
    <main className="casino-lobby-screen">
      <section className="casino-lobby-shell">
        <header className="casino-topbar">
          <a href="/" className="casino-brand">
            <div className="casino-logo">P</div>
            <div>
              <strong>PLAY Casino</strong>
              <span>Demo platform</span>
            </div>
          </a>
          <div className="casino-top-actions">
            {selectedGame && (
              <a href="/" className="casino-nav-button">
                Inicio
              </a>
            )}
            <a href="/admin" className="casino-nav-button">
              Admin
            </a>
            {session ? (
              <div className="casino-account">
                <span>{session.user.email}</span>
                <button type="button" onClick={signOut}>
                  Salir
                </button>
              </div>
            ) : (
              <a href="/login" className="casino-nav-button primary">
                Ingresar
              </a>
            )}
          </div>
        </header>

        {message && (
          <div className="casino-alert">
            {message}
          </div>
        )}

        {!selectedGame ? (
          <>
            <section className="casino-hero">
              <div className="casino-hero-copy">
                <span>PLAY Ecosystem</span>
                <h1>PLAY Casino</h1>
                <p>
                  Lobby mobile-first para juegos propios, mesas en vivo y futuros proveedores externos.
                </p>
                <div className="casino-hero-actions">
                  <a href="#play-originals">Juegos PLAY</a>
                  <a href="#providers">Proveedores demo</a>
                </div>
              </div>
              <div className="casino-balance-card">
                <span>Saldo demo</span>
                <strong>{formatMoney(totalChips || 250000)} Gs</strong>
                <small>{activePlayers} jugadores activos</small>
              </div>
            </section>

            <section className="casino-category-grid">
              {categories.map(([title, label, value]) => (
                <article key={title} className="casino-category">
                  <span>{label}</span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </article>
              ))}
            </section>

            <section id="play-originals" className="casino-section">
              <div className="casino-section-head">
                <div>
                  <span>PLAY Originals</span>
                  <h2>Juegos propios</h2>
                </div>
                <strong>{playOriginals.length} disponibles</strong>
              </div>
              <div className="casino-originals-grid">
                {playOriginals.map((game) => (
                  <a
                    key={game.id}
                    href={createGameLink(game.id)}
                    className={`casino-original-card accent-${game.accent}`}
                  >
                    <GameArtwork game={game} />
                    <span>{game.label}</span>
                    <strong>{game.name}</strong>
                    <small>{game.description}</small>
                  </a>
                ))}
              </div>
            </section>

            <section id="providers" className="casino-section">
              <div className="casino-section-head">
                <div>
                  <span>Casino externo</span>
                  <h2>Proveedores demo</h2>
                </div>
                <strong>Sin dinero real</strong>
              </div>
              <div className="provider-rows">
                {providerRows.map((row) => (
                  <section key={row.title} className="provider-row">
                    <div className="provider-row-head">
                      <div>
                        <span>{row.provider}</span>
                        <h3>{row.title}</h3>
                      </div>
                      <button type="button" disabled>
                        Proximamente
                      </button>
                    </div>
                    <div className="provider-game-list">
                      {row.games.map((gameName) => (
                        <ProviderGameCard
                          key={gameName}
                          name={gameName}
                          accent={row.accent}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="casino-tables-view">
            <div className={`casino-game-banner accent-${selectedGame.accent}`}>
              <GameArtwork game={selectedGame} />
              <div>
                <span>{selectedGame.status}</span>
                <h1>{selectedGame.name}</h1>
                <p>{selectedGame.description}</p>
              </div>
            </div>

            <section className="casino-section">
              <div className="casino-section-head">
                <div>
                  <span>{selectedGame.name}</span>
                  <h2>Mesas disponibles</h2>
                </div>
                <a href="/" className="casino-nav-button">
                  Cambiar juego
                </a>
              </div>

              <div className="casino-table-list">
                {loading && (
                  <div className="casino-empty">
                    Cargando mesas...
                  </div>
                )}

                {!loading && selectedGameTables.length === 0 && (
                  <div className="casino-empty">
                    <strong>No hay mesas creadas.</strong>
                    <span>Crea una mesa de {selectedGame.name} desde Admin.</span>
                  </div>
                )}

                {selectedGameTables.map((table) => {
                  const players =
                    table.players.filter((player) => player.status === "approved" || player.status === "seated");
                  const freeChips =
                    players.reduce((total, player) => total + player.chips, 0);

                  return (
                    <article key={table.id} className="casino-table-card">
                      <div>
                        <span>{getTableStatusLabel(table.status)}</span>
                        <h3>{table.name}</h3>
                        <p>{players.length} jugadores aprobados</p>
                      </div>
                      <div>
                        <span>Pozo minimo</span>
                        <strong>{formatMoney(table.minPot ?? 20000)} Gs</strong>
                      </div>
                      <div>
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
            </section>
          </section>
        )}
      </section>
    </main>
  );
}

export default PlayPlatformLobby;
