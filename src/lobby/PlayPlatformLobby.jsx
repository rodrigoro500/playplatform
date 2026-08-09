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
    accent: "green",
  },
  {
    id: "MAKAI",
    name: "MAKAI",
    status: "Proximamente",
    description: "Cartas españolas donde la suma nueve manda.",
    accent: "gold",
  },
  {
    id: "BOJO",
    name: "BOJO",
    status: "Proximamente",
    description: "Cinco cartas del mismo palo: 11, 10, 7, 6 y 5.",
    accent: "red",
  },
  {
    id: "BINGO",
    name: "BINGO",
    status: "Proximamente",
    description: "Salas de bingo para proximas versiones.",
    accent: "blue",
  },
  {
    id: "POKER",
    name: "POKER",
    status: "Proximamente",
    description: "Mesas de poker para proximas versiones.",
    accent: "violet",
  },
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

function SpanishCard({
  value,
  suit = "ORO",
}) {
  return (
    <div className="spanish-card">
      <span>{value}</span>
      <strong>{suit}</strong>
      <small>{value}</small>
    </div>
  );
}

function PaseArtwork() {
  return (
    <div className="game-art game-art-pase">
      <div className="dice-face five">
        <i /><i /><i /><i /><i />
      </div>
      <div className="dice-face three">
        <i /><i /><i />
      </div>
    </div>
  );
}

function MakaiArtwork() {
  return (
    <div className="game-art game-art-cards makai-cards">
      <div className="makai-pair">
        <SpanishCard value="7" suit="ORO" />
        <SpanishCard value="2" suit="COPA" />
      </div>
      <div className="makai-pair">
        <SpanishCard value="6" suit="ESP" />
        <SpanishCard value="3" suit="BASTO" />
      </div>
      <div className="makai-pair">
        <SpanishCard value="5" suit="COPA" />
        <SpanishCard value="4" suit="ORO" />
      </div>
    </div>
  );
}

function BojoArtwork() {
  return (
    <div className="game-art game-art-cards bojo-cards">
      {["11", "10", "7", "6", "5"].map((value) => (
        <SpanishCard key={value} value={value} suit="ORO" />
      ))}
    </div>
  );
}

function BingoArtwork() {
  return (
    <div className="game-art game-art-bingo">
      {["B7", "I18", "N33", "G48", "O72"].map((ball) => (
        <span key={ball}>{ball}</span>
      ))}
    </div>
  );
}

function PokerArtwork() {
  return (
    <div className="game-art game-art-poker">
      {["A", "K", "Q", "J", "10"].map((value, index) => (
        <div key={value} className={`poker-card card-${index}`}>
          <span>{value}</span>
          <strong>PLAY</strong>
        </div>
      ))}
    </div>
  );
}

function GameArtwork({
  gameId,
}) {
  if (gameId === "PASE") {
    return <PaseArtwork />;
  }

  if (gameId === "MAKAI") {
    return <MakaiArtwork />;
  }

  if (gameId === "BOJO") {
    return <BojoArtwork />;
  }

  if (gameId === "BINGO") {
    return <BingoArtwork />;
  }

  return <PokerArtwork />;
}

function PlayPlatformLobby() {
  const routeGameId =
    getGameIdFromPath();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const selectedGame =
    games.find((game) => game.id === routeGameId) ?? null;
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

        {!selectedGame ? (
          <section className="lobby-home">
            <div className="lobby-hero">
              <span>Lobby principal</span>
              <h2>Elige tu juego</h2>
              <p>PASE ya esta disponible. Los demas juegos quedan preparados para las siguientes fases.</p>
            </div>

            <div className="lobby-games">
              {games.map((game) => (
                <a
                  key={game.id}
                  href={createGameLink(game.id)}
                  className={`lobby-game-card accent-${game.accent}`}
                >
                  <GameArtwork gameId={game.id} />
                  <span>{game.status}</span>
                  <strong>{game.name}</strong>
                  <small>{game.description}</small>
                </a>
              ))}
            </div>
          </section>
        ) : (
          <section className="lobby-layout">
            <div className="lobby-games compact">
            {games.map((game) => (
              <a
                key={game.id}
                href={createGameLink(game.id)}
                className={`lobby-game-card accent-${game.accent} ${game.id === selectedGame.id ? "is-selected" : ""}`}
              >
                <GameArtwork gameId={game.id} />
                <span>{game.status}</span>
                <strong>{game.name}</strong>
                <small>{game.description}</small>
              </a>
            ))}
          </div>

          <section className="lobby-tables">
            <div className="lobby-section-head">
              <div>
                <span>Juego seleccionado</span>
                <h2>{selectedGame.name}</h2>
              </div>
              <div className="lobby-section-actions">
                <a href="/">Cambiar juego</a>
                <strong>{selectedGame.status}</strong>
              </div>
            </div>

            <div className={`lobby-feature accent-${selectedGame.accent}`}>
              <GameArtwork gameId={selectedGame.id} />
              <div>
                <span>{selectedGame.name}</span>
                <strong>{selectedGame.description}</strong>
              </div>
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
        )}
      </section>
    </main>
  );
}

export default PlayPlatformLobby;
