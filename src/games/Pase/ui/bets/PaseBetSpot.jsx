import PaseChipStack from "../chips/PaseChipStack";

function PaseBetSpot({
  title,
  chips = [],
}) {
  const hasChips = chips.length > 0;

  return (
    <div className="group flex flex-col items-center gap-3">
      <div className="text-center text-sm font-black uppercase tracking-[0.24em] text-amber-100 drop-shadow-[0_3px_12px_rgba(0,0,0,0.32)]">
        {title}
      </div>

      <div className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-amber-100/35 bg-white/8 shadow-[inset_0_0_28px_rgba(255,255,255,0.04),0_16px_34px_rgba(0,0,0,0.22)] transition duration-200 group-hover:border-amber-100/70 group-hover:bg-amber-100/10 group-hover:shadow-[inset_0_0_28px_rgba(255,255,255,0.06),0_18px_42px_rgba(0,0,0,0.28),0_0_24px_rgba(251,191,36,0.12)]">
        <div className="absolute inset-3 rounded-full border border-dashed border-amber-100/25 transition group-hover:border-amber-100/45" />
        <div className="absolute inset-8 rounded-full bg-emerald-200/5 blur-sm transition group-hover:bg-amber-100/10" />

        {hasChips && (
          <div className="relative z-10 -translate-x-2">
            <PaseChipStack chips={chips} />
          </div>
        )}
      </div>
    </div>
  );
}

export {
  PaseBetSpot,
};

export default PaseBetSpot;
