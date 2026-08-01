function PaseTableCenter() {
  return (
    <div className="flex h-full w-full items-center justify-center px-5 py-8 text-center">
      <div className="grid min-h-[420px] w-full max-w-4xl grid-rows-[1fr_auto_1.25fr_auto_1fr] items-center rounded-[3rem] border border-amber-100/20 bg-black/10 px-6 py-8 shadow-[inset_0_0_50px_rgba(255,255,255,0.04),0_22px_70px_rgba(0,0,0,0.18)] sm:px-10 lg:min-h-[520px] lg:px-14">
        <section className="flex flex-col items-center justify-end">
          <div className="text-[clamp(2.5rem,8vw,6.5rem)] font-black uppercase leading-none tracking-[0.2em] text-amber-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.36)]">
            PASE
          </div>
        </section>

        <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />

        <section className="flex min-h-40 flex-col items-center justify-center rounded-[2rem] border border-emerald-100/12 bg-emerald-950/18 px-6 py-10">
          <div className="text-sm font-bold uppercase tracking-[0.44em] text-emerald-50/70">
            Área para Dados
          </div>

          <div className="mt-6 flex min-h-24 w-full max-w-md items-center justify-center rounded-[1.5rem] border border-dashed border-amber-100/35 bg-black/10 text-xs font-semibold uppercase tracking-[0.22em] text-amber-100/55">
            Dados
          </div>
        </section>

        <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-200/70 to-transparent" />

        <section className="flex flex-col items-center justify-start">
          <div className="text-[clamp(2rem,7vw,5.25rem)] font-black uppercase leading-none tracking-[0.16em] text-red-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.36)]">
            KULO
          </div>
          <div className="mt-3 text-base font-semibold uppercase tracking-[0.28em] text-red-100/72 sm:text-lg">
            Mala
          </div>
        </section>
      </div>
    </div>
  );
}

export {
  PaseTableCenter,
};

export default PaseTableCenter;
