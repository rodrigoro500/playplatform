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
    id: "pragmatic",
    title: "Pragmatic Play",
    provider: "Demo provider",
    accent: "red",
    games: ["Wolf Gold", "Sweet Bonanza", "Gates of Olympus", "Sugar Rush", "Big Bass Bonanza", "The Dog House"],
  },
  {
    id: "amatic",
    title: "Amatic",
    provider: "Demo provider",
    accent: "blue",
    games: ["Hot Fruits", "Book of Aztec", "Lucky Bells", "Wild Shark", "Diamond Cats", "All Ways Fruits"],
  },
  {
    id: "wazdan",
    title: "Wazdan",
    provider: "Demo provider",
    accent: "violet",
    games: ["Magic Stars", "Power of Gods", "Sizzling 777", "Burning Sun", "9 Lions", "Hot Slot"],
  },
  {
    id: "cq9",
    title: "CQ9",
    provider: "Demo provider",
    accent: "green",
    games: ["Fa Cai Shen", "Lucky Bats", "God of War", "Jump High", "Thor", "Zeus"],
  },
];

const allProviderGames =
  providerRows.flatMap((row) => row.games.map((name, index) => ({
    id: `${row.id}-${index}`,
    name,
    providerId: row.id,
    providerName: row.title,
    accent: row.accent,
    volatility: index % 3 === 0 ? "Alta" : index % 3 === 1 ? "Media" : "Baja",
  })));

const categories = [
  ["Slots", "Proveedores demo", "126 juegos", "#slots"],
  ["Casino en vivo", "Proxima fase", "Ruleta y blackjack", "#live"],
  ["PLAY", "Juegos propios", "PASE y MAKAI", "#play"],
  ["Perfil", "Wallet demo", "Cuenta y movimientos", "#profile"],
];

const bottomNavItems = [
  ["Inicio", "#home", "⌂"],
  ["Slots", "#slots", "▦"],
  ["PLAY", "#play", "◆"],
  ["En Vivo", "#live", "◉"],
  ["Perfil", "#profile", "◎"],
];

const defaultDemoMovements = [
  {
    id: "initial-credit",
    label: "Carga demo",
    amount: 150000,
    status: "Aprobado",
    type: "credit",
  },
  {
    id: "initial-bet",
    label: "PASE mesa VIP",
    amount: -20000,
    status: "Apuesta",
    type: "debit",
  },
  {
    id: "initial-win",
    label: "Premio PASE",
    amount: 40000,
    status: "Ganancia",
    type: "credit",
  },
];

const defaultWallet = {
  balance: 250000,
  bonus: 20000,
  movements: defaultDemoMovements,
};

function getGameIdFromPath() {
  const match =
    window.location.pathname.match(/^\/games\/([^/]+)/);

  return match?.[1]?.toUpperCase() ?? null;
}

function getViewFromHash() {
  const hash =
    window.location.hash.replace("#", "");

  if (["slots", "play", "live", "profile"].includes(hash)) {
    return hash;
  }

  return "home";
}

function loadDemoWallet() {
  try {
    const storedWallet =
      window.localStorage.getItem("play-casino-demo-wallet");

    if (!storedWallet) {
      return defaultWallet;
    }

    const parsedWallet =
      JSON.parse(storedWallet);

    return {
      balance: Number(parsedWallet.balance) || defaultWallet.balance,
      bonus: Number(parsedWallet.bonus) || defaultWallet.bonus,
      movements: Array.isArray(parsedWallet.movements) && parsedWallet.movements.length > 0 ?
        parsedWallet.movements :
        defaultDemoMovements,
    };
  } catch {
    return defaultWallet;
  }
}

function saveDemoWallet(wallet) {
  window.localStorage.setItem("play-casino-demo-wallet", JSON.stringify(wallet));
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
  game,
  name,
  accent,
  onSelect,
}) {
  const gameName =
    game?.name ?? name;
  const gameAccent =
    game?.accent ?? accent;

  return (
    <button
      type="button"
      className={`provider-game-card accent-${gameAccent}`}
      onClick={() => onSelect?.(game)}
    >
      <div className="provider-game-mark">
        {gameName.split(" ").map((word) => word[0]).join("").slice(0, 2)}
      </div>
      <strong>{gameName}</strong>
      {game?.providerName && <small>{game.providerName}</small>}
      <span>Demo</span>
    </button>
  );
}

function PlayPlatformLobby() {
  const routeGameId =
    getGameIdFromPath();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);
  const [activeView, setActiveView] = useState(() => getViewFromHash());
  const [slotSearch, setSlotSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState("all");
  const [selectedProviderGame, setSelectedProviderGame] = useState(null);
  const [demoWallet, setDemoWallet] = useState(() => loadDemoWallet());
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
  const displayBalance =
    demoWallet.balance + totalChips;
  const filteredProviderGames =
    useMemo(() => {
      const query =
        slotSearch.trim().toLowerCase();

      return allProviderGames.filter((game) => {
        const matchesProvider =
          providerFilter === "all" || game.providerId === providerFilter;
        const matchesSearch =
          !query ||
          game.name.toLowerCase().includes(query) ||
          game.providerName.toLowerCase().includes(query);

        return matchesProvider && matchesSearch;
      });
    }, [providerFilter, slotSearch]);

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

  const addDemoWalletMovement = ({
    label,
    amount,
    status,
    type,
  }) => {
    setDemoWallet((currentWallet) => {
      const nextBalance =
        Math.max(0, currentWallet.balance + amount);
      const nextWallet = {
        ...currentWallet,
        balance: nextBalance,
        movements: [
          {
            id: crypto.randomUUID(),
            label,
            amount,
            status,
            type,
          },
          ...currentWallet.movements,
        ].slice(0, 8),
      };

      saveDemoWallet(nextWallet);

      return nextWallet;
    });
  };

  useEffect(() => {
    const syncHashView = () => {
      setActiveView(getViewFromHash());
    };

    window.addEventListener("hashchange", syncHashView);

    return () => {
      window.removeEventListener("hashchange", syncHashView);
    };
  }, []);

  const showHome =
    !selectedGame && activeView === "home";
  const showSlots =
    !selectedGame && activeView === "slots";
  const showPlay =
    !selectedGame && activeView === "play";
  const showLive =
    !selectedGame && activeView === "live";
  const showProfile =
    !selectedGame && activeView === "profile";

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
            {showHome && (
            <section id="home" className="casino-hero">
              <div className="casino-hero-copy">
                <span>PLAY Ecosystem</span>
                <h1>PLAY Casino</h1>
                <p>
                  Lobby mobile-first para juegos propios, mesas en vivo y futuros proveedores externos.
                </p>
                <div className="casino-hero-actions">
                  <a href="#play">Juegos PLAY</a>
                  <a href="#slots">Slots demo</a>
                </div>
              </div>
              <div className="casino-balance-card">
                <span>Saldo demo</span>
                <strong>{formatMoney(displayBalance)} Gs</strong>
                <small>{activePlayers} jugadores activos</small>
              </div>
            </section>
            )}

            {showHome && (
            <section className="casino-category-grid">
              {categories.map(([title, label, value, href]) => (
                <a key={title} href={href} className="casino-category">
                  <span>{label}</span>
                  <strong>{title}</strong>
                  <small>{value}</small>
                </a>
              ))}
            </section>
            )}

            {(showHome || showPlay) && (
            <section id="play" className="casino-section">
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
            )}

            {(showHome || showSlots) && (
            <section id="slots" className="casino-section">
              <div className="casino-section-head">
                <div>
                  <span>Casino externo</span>
                  <h2>Slots demo</h2>
                </div>
                <strong>Sin dinero real</strong>
              </div>
              {showSlots && (
                <div className="casino-slot-toolbar">
                  <label>
                    <span>Buscar juego</span>
                    <input
                      value={slotSearch}
                      onChange={(event) => setSlotSearch(event.target.value)}
                      placeholder="Wolf, Gates, Hot..."
                    />
                  </label>
                  <div className="casino-provider-tabs">
                    <button
                      type="button"
                      className={providerFilter === "all" ? "is-active" : ""}
                      onClick={() => setProviderFilter("all")}
                    >
                      Todos
                    </button>
                    {providerRows.map((row) => (
                      <button
                        key={row.id}
                        type="button"
                        className={providerFilter === row.id ? "is-active" : ""}
                        onClick={() => setProviderFilter(row.id)}
                      >
                        {row.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showSlots ? (
                <div className="provider-game-list expanded">
                  {filteredProviderGames.map((game) => (
                    <ProviderGameCard
                      key={game.id}
                      game={game}
                      onSelect={setSelectedProviderGame}
                    />
                  ))}
                </div>
              ) : (
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
                          game={allProviderGames.find((game) => game.name === gameName && game.providerId === row.id)}
                          onSelect={setSelectedProviderGame}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              )}
            </section>
            )}

            {showLive && (
            <section id="live" className="casino-section casino-coming-soon">
              <div className="casino-section-head">
                <div>
                  <span>Proxima fase</span>
                  <h2>Casino en vivo</h2>
                </div>
                <strong>Preparado</strong>
              </div>
              <div className="casino-live-grid">
                {["Ruleta en vivo", "Blackjack", "Baccarat", "Game shows"].map((name) => (
                  <ProviderGameCard key={name} name={name} accent="blue" />
                ))}
              </div>
            </section>
            )}

            {showProfile && (
            <section id="profile" className="casino-section casino-profile">
              <div className="casino-section-head">
                <div>
                  <span>Cuenta PLAY</span>
                  <h2>Perfil y wallet demo</h2>
                </div>
                <strong>{session ? "Sesion activa" : "Invitado"}</strong>
              </div>
              <div className="casino-profile-grid">
                <div className="casino-wallet-panel">
                  <span>Saldo disponible</span>
                  <strong>{formatMoney(displayBalance)} Gs</strong>
                  <small>Bono demo: {formatMoney(demoWallet.bonus)} Gs</small>
                  <div className="casino-wallet-actions">
                    <button
                      type="button"
                      onClick={() => addDemoWalletMovement({
                        label: "Deposito demo",
                        amount: 50000,
                        status: "Aprobado",
                        type: "credit",
                      })}
                    >
                      Depositar
                    </button>
                    <button
                      type="button"
                      onClick={() => addDemoWalletMovement({
                        label: "Retiro demo",
                        amount: -20000,
                        status: "Solicitado",
                        type: "debit",
                      })}
                    >
                      Retirar
                    </button>
                    <button
                      type="button"
                      onClick={() => addDemoWalletMovement({
                        label: "Bono PLAY",
                        amount: 10000,
                        status: "Bono",
                        type: "credit",
                      })}
                    >
                      Bono
                    </button>
                  </div>
                </div>
                <div className="casino-movement-list">
                  {demoWallet.movements.map((movement) => (
                    <article key={movement.id}>
                      <div>
                        <strong>{movement.label}</strong>
                        <span>{movement.status}</span>
                      </div>
                      <b className={movement.type === "debit" ? "is-debit" : ""}>
                        {movement.amount > 0 ? "+" : ""}{formatMoney(movement.amount)} Gs
                      </b>
                    </article>
                  ))}
                </div>
              </div>
            </section>
            )}
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
      {!selectedGame && (
        <nav className="casino-bottom-nav" aria-label="Navegacion PLAY Casino">
          {bottomNavItems.map(([label, href, icon]) => (
            <a
              key={label}
              href={href}
              className={activeView === href.slice(1) ? "is-active" : ""}
            >
              <span>{icon}</span>
              <strong>{label}</strong>
            </a>
          ))}
        </nav>
      )}
      {selectedProviderGame && (
        <div className="casino-game-modal" role="dialog" aria-modal="true">
          <div className="casino-game-modal-card">
            <button
              type="button"
              className="casino-modal-close"
              onClick={() => setSelectedProviderGame(null)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <ProviderGameCard game={selectedProviderGame} />
            <div className="casino-game-modal-copy">
              <span>{selectedProviderGame.providerName}</span>
              <h2>{selectedProviderGame.name}</h2>
              <p>Juego de demostracion preparado para la futura API de agregador.</p>
              <div className="casino-game-facts">
                <span>Modo demo</span>
                <span>Volatilidad {selectedProviderGame.volatility}</span>
                <span>Wallet externa futura</span>
              </div>
              <button type="button" disabled>
                Integracion pendiente
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default PlayPlatformLobby;
