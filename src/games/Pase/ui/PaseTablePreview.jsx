const players = [
  {
    id: "P1",
    name: "Jugador 1",
    position: "left-[calc(50%_-_421px)] top-[calc(50%_-_167px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-[calc(50%_-_275px)] top-[calc(50%_-_95px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "P2",
    name: "Jugador 2",
    position: "left-1/2 top-[calc(50%_-_286px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-1/2 top-[calc(50%_-_185px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "P3",
    name: "Jugador 3",
    position: "left-[calc(50%_+_421px)] top-[calc(50%_-_167px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-[calc(50%_+_275px)] top-[calc(50%_-_95px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "P4",
    name: "Jugador 4",
    position: "left-[calc(50%_+_421px)] top-[calc(50%_+_167px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-[calc(50%_+_275px)] top-[calc(50%_+_95px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "P5",
    name: "Jugador 5",
    position: "left-1/2 top-[calc(50%_+_286px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-1/2 top-[calc(50%_+_185px)] -translate-x-1/2 -translate-y-1/2",
  },
  {
    id: "P6",
    name: "Jugador 6",
    position: "left-[calc(50%_-_421px)] top-[calc(50%_+_167px)] -translate-x-1/2 -translate-y-1/2",
    chipPosition: "left-[calc(50%_-_275px)] top-[calc(50%_+_95px)] -translate-x-1/2 -translate-y-1/2",
  },
];

const history = [
  {
    id: 1,
    dice: "4 + 3",
    total: 7,
    result: "PASE",
  },
  {
    id: 2,
    dice: "6 + 1",
    total: 7,
    result: "PASE",
  },
  {
    id: 3,
    dice: "2 + 1",
    total: 3,
    result: "KULO",
  },
  {
    id: 4,
    dice: "5 + 2",
    total: 7,
    result: "PASE",
  },
];

const playerChipStack = [
  {
    outer: "from-red-500 via-red-700 to-red-950",
    inner: "bg-red-600",
  },
  {
    outer: "from-blue-400 via-blue-700 to-blue-950",
    inner: "bg-blue-600",
  },
  {
    outer: "from-emerald-400 via-emerald-700 to-emerald-950",
    inner: "bg-emerald-600",
  },
  {
    outer: "from-zinc-600 via-zinc-950 to-black",
    inner: "bg-zinc-950",
  },
  {
    outer: "from-amber-200 via-amber-500 to-yellow-800",
    inner: "bg-amber-400",
  },
];

function PaseTablePreview() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#08130d] text-white">
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_35%_20%,rgba(36,95,60,0.45),transparent_34%),linear-gradient(135deg,#07100c_0%,#0c1d14_48%,#050806_100%)]">
        <header className="border-b border-amber-300/40 bg-black/30 px-6 py-5 text-center shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur">
          <h1 className="text-xl font-semibold tracking-[0.32em] text-amber-100 md:text-2xl">
            PLAYPLATFORM
          </h1>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-6">
          <div className="flex min-h-[620px] flex-col gap-5">
            <div className="relative min-h-[690px] flex-1 overflow-hidden rounded-[2rem] border border-amber-300/30 bg-emerald-950/35 p-3 shadow-[0_24px_72px_rgba(0,0,0,0.34)] md:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_50%_48%,rgba(16,185,129,0.14),transparent_48%)]" />
              <div className="absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-emerald-300/10 blur-3xl" />

              <div className="relative mx-auto mt-8 h-[621px] w-full max-w-[994px] rounded-[50%] border-[12px] border-[#d2a43b] bg-[linear-gradient(145deg,#2c1a05_0%,#d7ac43_20%,#7a4a08_43%,#f1d06a_68%,#5d3706_100%)] p-3 shadow-[0_30px_82px_rgba(0,0,0,0.46),0_0_42px_rgba(16,185,129,0.12)]">
                <div className="h-full w-full rounded-[50%] border-[8px] border-[#251408] bg-[linear-gradient(145deg,#130905_0%,#432816_50%,#120805_100%)] p-3 shadow-[inset_0_3px_12px_rgba(255,255,255,0.08),inset_0_-10px_24px_rgba(0,0,0,0.38)]">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[50%] border-[5px] border-emerald-300/80 bg-[radial-gradient(circle_at_50%_24%,rgba(255,255,255,0.1)_0%,transparent_22%),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.022)_1px,transparent_1px),radial-gradient(circle_at_50%_48%,#176540_0%,#0e4a31_44%,#082d20_72%,#051a12_100%)] bg-[length:auto,30px_30px,30px_30px,auto] shadow-[inset_0_0_48px_rgba(52,211,153,0.2),inset_0_0_110px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_0%,rgba(255,255,255,0.1)_16%,transparent_35%,transparent_100%)] opacity-40" />
                    <div className="absolute inset-[10%] rounded-[50%] border border-amber-100/15" />
                    <div className="absolute inset-[19%] rounded-[50%] border border-emerald-100/18" />

                    <div className="relative z-10 flex h-[72%] w-[72%] flex-col items-center justify-center rounded-[45%] border border-amber-100/10 bg-black/[0.04] px-10 py-12 text-center shadow-[inset_0_0_20px_rgba(255,255,255,0.03),0_10px_24px_rgba(0,0,0,0.1)]">
                      <div className="mb-10">
                        <div className="text-[10px] font-black uppercase tracking-[0.34em] text-amber-100/62">
                          PLAYPLATFORM
                        </div>
                        <div className="mt-3 text-6xl font-black uppercase leading-none tracking-[0.22em] text-amber-100 drop-shadow-[0_4px_14px_rgba(0,0,0,0.34)] md:text-7xl">
                          PASE
                        </div>
                      </div>

                      <div className="grid w-full max-w-2xl grid-cols-[1fr_auto_1fr] items-center gap-8">
                        <div className="flex h-32 items-center justify-center rounded-[2rem] border border-amber-100/32 bg-black/[0.07] text-3xl font-black uppercase tracking-[0.18em] text-emerald-100/90 shadow-[0_0_18px_rgba(251,191,36,0.06),inset_0_0_18px_rgba(255,255,255,0.025)]">
                          SUERTE
                        </div>

                      <div className="flex h-36 w-36 items-center justify-center rounded-full border border-amber-100/35 bg-emerald-950/18 text-6xl leading-none text-amber-100 shadow-[0_8px_22px_rgba(0,0,0,0.18),inset_0_0_24px_rgba(255,255,255,0.035)] md:text-7xl">
                        🎲 🎲
                      </div>

                      <div className="flex h-32 flex-col items-center justify-center rounded-[2rem] border border-amber-100/32 bg-black/[0.07] text-red-100/90 shadow-[0_0_18px_rgba(251,191,36,0.06),inset_0_0_18px_rgba(255,255,255,0.025)]">
                        <div className="text-3xl font-black uppercase tracking-[0.18em]">
                          KULO
                        </div>
                        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-red-100/62">
                          MALA
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {players.map((player) => (
                <div
                  key={player.id}
                  className={`absolute ${player.position}`}
                >
                  <div className="w-32 rounded-xl border border-amber-200/50 bg-black/50 p-2 text-center shadow-[0_12px_30px_rgba(0,0,0,0.28),0_0_14px_rgba(52,211,153,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/65 bg-zinc-800 text-[10px] font-black uppercase tracking-[0.1em] text-amber-100 shadow-[0_8px_18px_rgba(0,0,0,0.26)]">
                      {player.id}
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.72)]" />
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-100">
                        ONLINE
                      </span>
                    </div>

                    <div className="mt-1 truncate text-xs font-black uppercase tracking-[0.12em] text-amber-100">
                      {player.name}
                    </div>

                    <div className="text-[11px] font-semibold text-emerald-100">
                      Gs. 1.250.000
                    </div>

                    <div className="mt-2 hidden rounded-full border border-amber-100/40 bg-amber-200/10 px-2 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-amber-100">
                      Turno
                    </div>

                  </div>
                </div>
              ))}

              {players.map((player) => (
                <div
                  key={`${player.id}-chips`}
                  className={`absolute z-30 ${player.chipPosition}`}
                >
                  <div className="relative h-12 w-20 rounded-full shadow-[0_16px_20px_rgba(0,0,0,0.34)]">
                    {playerChipStack.map((chip, index) => (
                      <div
                        key={`${player.id}-${chip.inner}`}
                        className={`absolute left-1/2 h-8 w-16 -translate-x-1/2 rounded-full border-2 border-white bg-gradient-to-br ${chip.outer} shadow-[0_7px_14px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.32),inset_0_-5px_8px_rgba(0,0,0,0.26)]`}
                        style={{
                          bottom: `${index * 4}px`,
                          zIndex: index + 1,
                        }}
                      >
                        <div className="absolute inset-1 rounded-full border border-white/65" />
                        <div className={`absolute left-1/2 top-1/2 h-4 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/45 ${chip.inner} shadow-[inset_0_1px_4px_rgba(255,255,255,0.25)]`} />
                        <div className="absolute left-3 top-1 h-2 w-7 rounded-full bg-white/28 blur-sm" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-amber-300/30 bg-black/30 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-100">
                  Historial de resultados
                </h2>
                <span className="rounded-full border border-emerald-200/30 px-3 py-1 text-xs text-emerald-100/80">
                  Ãšltimas tiradas
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <span>Ronda {item.id}</span>
                      <span>{item.dice}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div className="text-3xl font-bold text-amber-100">
                        {item.total}
                      </div>
                      <div className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                        {item.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-amber-300/35 bg-[#11140f]/80 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-100/70">
                Mesa Pase
              </div>
              <h2 className="mt-2 text-2xl font-bold text-white">
                Control de partida
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Estado de partida
                </div>
                <div className="mt-2 text-lg font-semibold text-emerald-100">
                  En juego
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Estado de ronda
                </div>
                <div className="mt-2 text-lg font-semibold text-amber-100">
                  Lanzando dados
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Saldo del jugador
                </div>
                <div className="mt-2 text-3xl font-bold text-white">
                  1,250
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Ãšltima tirada
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-4xl text-amber-100">ðŸŽ² ðŸŽ²</span>
                  <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-sm font-semibold text-emerald-100">
                    Total 7
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                className="rounded-xl border border-amber-200/70 bg-amber-300 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-emerald-950 shadow-[0_14px_34px_rgba(251,191,36,0.24)] transition hover:bg-amber-200"
              >
                Lanzar Dados
              </button>

              <button
                type="button"
                className="rounded-xl border border-amber-200/40 bg-transparent px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-amber-100 transition hover:bg-amber-200/10"
              >
                Nueva Ronda
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

export {
  PaseTablePreview,
};

export default PaseTablePreview;
