function PaseCasinoTable() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07100b] px-4 py-8 text-white">
      <div className="relative flex w-full max-w-6xl items-center justify-center">
        <div className="absolute h-[62vw] max-h-[680px] min-h-[320px] w-[96vw] max-w-6xl rounded-[999px] bg-amber-300/10 blur-3xl" />

        <div className="relative aspect-[1.65/1] w-full max-w-6xl rounded-[999px] border-[10px] border-[#c99a2e] bg-[linear-gradient(145deg,#241704_0%,#d9ad42_18%,#7a4c0b_42%,#f2d06b_68%,#6e4309_100%)] p-3 shadow-[0_36px_110px_rgba(0,0,0,0.58),0_0_50px_rgba(234,179,8,0.08)] sm:border-[14px] sm:p-4 lg:border-[18px] lg:p-5">
          <div className="flex h-full w-full rounded-[999px] border-[5px] border-emerald-300/70 bg-[radial-gradient(circle_at_50%_42%,#17633e_0%,#0f4a31_38%,#0a3223_70%,#061c14_100%)] p-4 shadow-[inset_0_0_52px_rgba(16,185,129,0.2),inset_0_0_120px_rgba(0,0,0,0.34)] sm:p-6 lg:p-9">
            <div className="relative flex h-full w-full items-center justify-center rounded-[999px] border border-emerald-100/18 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.18)_100%)]">
              <div className="absolute inset-[8%] rounded-[999px] border border-amber-100/15" />
              <div className="absolute inset-[18%] rounded-[999px] border border-emerald-200/15" />

              <div className="relative z-10 grid w-[72%] max-w-3xl grid-rows-[1fr_auto_1fr] items-center gap-4 rounded-[3rem] border border-amber-100/20 bg-black/10 px-5 py-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-[1px] sm:px-10 sm:py-8 lg:gap-7">
                <section className="flex flex-col items-center justify-end">
                  <div className="text-[clamp(2rem,7vw,5.5rem)] font-black uppercase leading-none tracking-[0.18em] text-amber-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.38)]">
                    PASE
                  </div>
                  <div className="mt-3 h-px w-32 bg-amber-100/55 sm:w-52" />
                </section>

                <section className="flex flex-col items-center justify-center">
                  <div className="text-xs font-bold uppercase tracking-[0.42em] text-emerald-50/75 sm:text-sm">
                    Dados
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="grid h-14 w-14 grid-cols-3 grid-rows-3 rounded-xl border border-amber-100/50 bg-amber-50 p-2 shadow-[0_12px_28px_rgba(0,0,0,0.38)] sm:h-20 sm:w-20 sm:rounded-2xl sm:p-3">
                      <span className="col-start-1 row-start-1 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-3 row-start-1 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-2 row-start-2 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-1 row-start-3 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-3 row-start-3 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                    </div>

                    <div className="grid h-14 w-14 grid-cols-3 grid-rows-3 rounded-xl border border-amber-100/50 bg-amber-50 p-2 shadow-[0_12px_28px_rgba(0,0,0,0.38)] sm:h-20 sm:w-20 sm:rounded-2xl sm:p-3">
                      <span className="col-start-1 row-start-1 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-2 row-start-2 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                      <span className="col-start-3 row-start-3 h-2.5 w-2.5 rounded-full bg-emerald-950 sm:h-3.5 sm:w-3.5" />
                    </div>
                  </div>
                </section>

                <section className="flex flex-col items-center justify-start">
                  <div className="mb-3 h-px w-32 bg-amber-100/55 sm:w-52" />
                  <div className="text-[clamp(1.5rem,5vw,4rem)] font-black uppercase leading-none tracking-[0.14em] text-red-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.38)]">
                    KULO
                  </div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-[0.24em] text-red-100/70 sm:text-base">
                    Mala
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export {
  PaseCasinoTable,
};

export default PaseCasinoTable;
