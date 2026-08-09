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

const spanishDeck = {
  image: "/assets/baraja-espanola.svg",
  width: 2496,
  height: 1595,
  cardWidth: 207,
  cardHeight: 318,
};

const spanishCards = {
  "7_ORO": { x: 1248, y: 1 },
  "2_COPA": { x: 208, y: 320 },
  "6_ESPADA": { x: 1040, y: 638 },
  "3_BASTO": { x: 416, y: 957 },
  "5_COPA": { x: 832, y: 320 },
  "4_ORO": { x: 624, y: 1 },
  "11_ORO": { x: 1872, y: 1 },
  "10_ORO": { x: 1872, y: 1 },
  "6_ORO": { x: 1040, y: 1 },
  "5_ORO": { x: 832, y: 1 },
};

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

function RealSpanishCard({
  card,
  label,
  tilt = 0,
  lift = 0,
}) {
  const source =
    spanishCards[card] ?? spanishCards["7_ORO"];
  const scale = 0.35;

  return (
    <div
      className="real-spanish-card"
      style={{
        width: spanishDeck.cardWidth * scale,
        height: spanishDeck.cardHeight * scale,
        backgroundImage: `url(${spanishDeck.image})`,
        backgroundSize: `${spanishDeck.width * scale}px ${spanishDeck.height * scale}px`,
        backgroundPosition: `-${source.x * scale}px -${source.y * scale}px`,
        transform: `rotate(${tilt}deg) translateY(${lift}px)`,
      }}
    >
      <span className="sr-only">{card}</span>
      {label && (
        <>
          <span className="real-spanish-card-label top">{label}</span>
          <span className="real-spanish-card-label bottom">{label}</span>
        </>
      )}
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
        <RealSpanishCard card="7_ORO" tilt={-8} />
        <RealSpanishCard card="2_COPA" tilt={8} />
      </div>
      <div className="makai-pair">
        <RealSpanishCard card="6_ESPADA" tilt={-8} />
        <RealSpanishCard card="3_BASTO" tilt={8} />
      </div>
      <div className="makai-pair">
        <RealSpanishCard card="5_COPA" tilt={-8} />
        <RealSpanishCard card="4_ORO" tilt={8} />
      </div>
    </div>
  );
}

function BojoArtwork() {
  const bojoCards = [
    ["11_ORO", "11", -18, 16],
    ["10_ORO", null, -9, 6],
    ["7_ORO", null, 0, 0],
    ["6_ORO", null, 9, 6],
    ["5_ORO", null, 18, 16],
  ];

  return (
    <div className="game-art game-art-cards bojo-cards">
      {bojoCards.map(([card, label, tilt, lift]) => (
        <RealSpanishCard key={`${card}-${label ?? "native"}`} card={card} label={label} tilt={tilt} lift={lift} />
      ))}
    </div>
  );
}

function BingoArtwork() {
  return (
    <div className="game-art game-art-bingo">
      {["B 7", "I 18", "N 33", "G 48", "O 72"].map((ball, index) => (
        <span key={ball} className={`bingo-ball ball-${index}`}>
          <strong>{ball.split(" ")[0]}</strong>
          <em>{ball.split(" ")[1]}</em>
        </span>
      ))}
    </div>
  );
}

function PokerArtwork() {
  const pokerCards = [
    ["A", "spade"],
    ["K", "heart"],
    ["Q", "diamond"],
    ["J", "club"],
    ["10", "spade"],
  ];

  return (
    <div className="game-art game-art-poker">
      {pokerCards.map(([value, suit], index) => (
        <div key={`${value}-${suit}`} className={`poker-card card-${index} suit-${suit}`}>
          <span>{value}</span>
          <strong>{suit === "spade" ? "♠" : suit === "heart" ? "♥" : suit === "diamond" ? "♦" : "♣"}</strong>
          <small>{value}</small>
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

        <p className="lobby-asset-credit">
          Baraja espanola: Germarquezm, CC BY-SA 3.0, via Wikimedia Commons.
        </p>
      </section>
    </main>
  );
}

export default PlayPlatformLobby;
