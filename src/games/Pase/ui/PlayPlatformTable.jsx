const players = [
  {
    id: "P1",
    name: "Carlos",
    balance: "1,250",
    position: "left-[9%] top-[22%]",
  },
  {
    id: "P2",
    name: "Ana",
    balance: "2,100",
    position: "left-1/2 top-[8%] -translate-x-1/2",
  },
  {
    id: "P3",
    name: "Luis",
    balance: "875",
    position: "right-[9%] top-[22%]",
  },
  {
    id: "P4",
    name: "María",
    balance: "1,640",
    position: "right-[8%] bottom-[20%]",
  },
  {
    id: "P5",
    name: "Sofía",
    balance: "3,250",
    position: "left-1/2 bottom-[7%] -translate-x-1/2",
  },
  {
    id: "P6",
    name: "Diego",
    balance: "940",
    position: "left-[8%] bottom-[20%]",
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
    dice: "2 + 1",
    total: 3,
    result: "KULO",
  },
  {
    id: 3,
    dice: "5 + 2",
    total: 7,
    result: "PASE",
  },
  {
    id: 4,
    dice: "6 + 1",
    total: 7,
    result: "PASE",
  },
];

function PlayPlatformTable() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-[#050806] text-white">
      <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_35%_15%,rgba(16,185,129,0.18),transparent_32%),radial-gradient(circle_at_78%_38%,rgba(234,179,8,0.1),transparent_28%),linear-gradient(135deg,#050806_0%,#0a1710_48%,#030504_100%)]">
        <header className="border-b border-amber-200/25 bg-black/35 px-5 py-4 text-center shadow-[0_16px_46px_rgba(0,0,0,0.3)] backdrop-blur">
          <h1 className="text-lg font-black uppercase tracking-[0.42em] text-amber-100 md:text-2xl">
            PlayPlatform
          </h1>
        </header>

        <section className="grid min-h-0 flex-1 grid-cols-1 gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_330px] lg:p-6">
          <div className="flex min-h-[680px] flex-col gap-5">
            <div className="relative flex min-h-[540px] flex-1 items-center justify-center overflow-hidden rounded-[2rem] border border-amber-200/20 bg-black/18 p-4 shadow-[0_32px_100px_rgba(0,0,0,0.42)]">
              <div className="absolute h-[58vw] max-h-[720px] min-h-[360px] w-[80vw] max-w-7xl rounded-[999px] bg-amber-300/10 blur-3xl" />
              <div className="absolute h-[46vw] max-h-[560px] min-h-[300px] w-[68vw] max-w-6xl rounded-[999px] bg-emerald-300/8 blur-2xl" />

              <div className="relative aspect-[1.78/1] w-[70%] min-w-[760px] max-w-7xl rounded-[999px] border-[18px] border-[#c99a2e] bg-[linear-gradient(145deg,#2b1a04_0%,#e1b84b_18%,#7a4a09_42%,#f4d56f_68%,#5f3907_100%)] p-5 shadow-[0_42px_120px_rgba(0,0,0,0.62),0_0_70px_rgba(234,179,8,0.1)] max-lg:min-w-0 max-lg:w-full max-lg:border-[12px] max-lg:p-3">
                <div className="relative flex h-full w-full rounded-[999px] border-[6px] border-emerald-300/75 bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.08)_0%,transparent_22%),radial-gradient(circle_at_50%_50%,#17653f_0%,#0e4a30_42%,#082d20_74%,#061a12_100%)] p-7 shadow-[inset_0_0_62px_rgba(16,185,129,0.24),inset_0_0_140px_rgba(0,0,0,0.38)] max-lg:p-4">
                  <div className="absolute inset-[6%] rounded-[999px] border border-amber-100/16" />
                  <div className="absolute inset-[14%] rounded-[999px] border border-emerald-100/18" />
                  <div className="absolute inset-[24%] rounded-[999px] border border-white/8" />

                  <div className="absolute inset-[18%] z-10 flex items-center justify-center rounded-[999px] border border-amber-100/18 bg-black/8 px-8 py-10 text-center shadow-[inset_0_0_42px_rgba(255,255,255,0.04)] backdrop-blur-[1px]">
                    <div className="flex h-full w-full max-w-3xl flex-col items-center justify-between">
                      <div>
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-100/60 bg-[radial-gradient(circle_at_35%_25%,#fff3b0,#c89420_45%,#4c2f06_100%)] text-xl font-black text-emerald-950 shadow-[0_16px_34px_rgba(0,0,0,0.35),0_0_24px_rgba(251,191,36,0.14)]">
                          PP
                        </div>
                        <div className="text-sm font-black uppercase tracking-[0.38em] text-amber-100/80 md:text-base">
                          PlayPlatform
                        </div>
                        <div className="mt-3 text-[clamp(2rem,5vw,5.5rem)] font-black uppercase leading-none tracking-[0.2em] text-amber-100 drop-shadow-[0_5px_20px_rgba(0,0,0,0.42)]">
                          PASE
                        </div>
                      </div>

                      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />

                      <div className="flex min-h-28 w-full max-w-xl flex-col items-center justify-center rounded-[2rem] border border-dashed border-amber-100/35 bg-emerald-950/20 px-6 py-6">
                        <div className="text-xs font-bold uppercase tracking-[0.42em] text-emerald-50/70">
                          Área reservada para dados
                        </div>
                        <div className="mt-4 flex gap-4">
                          <div className="grid h-16 w-16 grid-cols-3 grid-rows-3 rounded-2xl border border-amber-100/55 bg-amber-50 p-3 shadow-[0_14px_32px_rgba(0,0,0,0.38)]">
                            <span className="col-start-1 row-start-1 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-3 row-start-1 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-2 row-start-2 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-1 row-start-3 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-3 row-start-3 h-3 w-3 rounded-full bg-emerald-950" />
                          </div>
                          <div className="grid h-16 w-16 grid-cols-3 grid-rows-3 rounded-2xl border border-amber-100/55 bg-amber-50 p-3 shadow-[0_14px_32px_rgba(0,0,0,0.38)]">
                            <span className="col-start-1 row-start-1 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-2 row-start-2 h-3 w-3 rounded-full bg-emerald-950" />
                            <span className="col-start-3 row-start-3 h-3 w-3 rounded-full bg-emerald-950" />
                          </div>
                        </div>
                      </div>

                      <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />

                      <div>
                        <div className="text-[clamp(1.75rem,4vw,4rem)] font-black uppercase leading-none tracking-[0.16em] text-red-100 drop-shadow-[0_5px_20px_rgba(0,0,0,0.42)]">
                          KULO
                        </div>
                        <div className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-red-100/72">
                          Mala
                        </div>
                      </div>
                    </div>
                  </div>

                  {players.map((player) => (
                    <div
                      key={player.id}
                      className={`absolute z-20 ${player.position}`}
                    >
                      <div className="w-32 rounded-[1.35rem] border border-amber-100/45 bg-[#07120d]/84 p-3 text-center shadow-[0_18px_44px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-amber-100/50 bg-[radial-gradient(circle_at_35%_28%,#2f7951,#092017_76%)] text-xs font-black uppercase tracking-[0.12em] text-amber-100 shadow-[0_10px_24px_rgba(0,0,0,0.3)]">
                          {player.id}
                        </div>
                        <div className="mt-2 flex items-center justify-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.78)]" />
                          <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-white">
                            {player.name}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-semibold text-amber-100/80">
                          {player.balance}
                        </div>
                        <div className="mt-3 rounded-full border border-amber-100/25 bg-black/28 px-2 py-2">
                          <div className="mx-auto flex h-5 justify-center gap-1">
                            <span className="h-4 w-4 rounded-full border border-amber-100/50 bg-amber-300 shadow-[0_4px_12px_rgba(251,191,36,0.25)]" />
                            <span className="h-4 w-4 rounded-full border border-red-100/40 bg-red-600 shadow-[0_4px_12px_rgba(239,68,68,0.2)]" />
                            <span className="h-4 w-4 rounded-full border border-blue-100/40 bg-blue-600 shadow-[0_4px_12px_rgba(59,130,246,0.2)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <section className="rounded-2xl border border-amber-200/25 bg-black/32 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-black uppercase tracking-[0.26em] text-amber-100">
                  Historial
                </h2>
                <span className="rounded-full border border-emerald-100/25 px-3 py-1 text-xs font-semibold text-emerald-100/80">
                  Resultados recientes
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-white/[0.06] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-white/55">
                      <span>Ronda {item.id}</span>
                      <span>{item.dice}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <span className="text-3xl font-black text-amber-100">
                        {item.total}
                      </span>
                      <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-bold text-emerald-100">
                        {item.result}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="rounded-2xl border border-amber-200/30 bg-[#10130f]/86 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.4)] backdrop-blur">
            <div className="mb-6">
              <div className="text-xs font-black uppercase tracking-[0.28em] text-amber-100/70">
                Panel derecho
              </div>
              <h2 className="mt-2 text-2xl font-black text-white">
                Mesa VIP
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Estado de partida
                </div>
                <div className="mt-2 text-lg font-bold text-emerald-100">
                  En juego
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Estado de ronda
                </div>
                <div className="mt-2 text-lg font-bold text-amber-100">
                  Esperando tirada
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/45">
                  Saldo
                </div>
                <div className="mt-2 text-3xl font-black text-white">
                  1,250
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                className="rounded-xl border border-emerald-100/50 bg-emerald-400 px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-emerald-950 shadow-[0_14px_34px_rgba(52,211,153,0.22)] transition hover:bg-emerald-300"
              >
                Lanzar Dados
              </button>

              <button
                type="button"
                className="rounded-xl border border-amber-100/40 bg-transparent px-5 py-4 text-sm font-black uppercase tracking-[0.18em] text-amber-100 transition hover:bg-amber-100/10"
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
  PlayPlatformTable,
};

export default PlayPlatformTable;
