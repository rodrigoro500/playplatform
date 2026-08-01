const chipColors = {
  white: {
    outer: "from-zinc-100 via-white to-zinc-300",
    inner: "bg-zinc-50 text-zinc-950",
    accent: "border-zinc-300",
  },
  red: {
    outer: "from-red-500 via-red-700 to-red-950",
    inner: "bg-red-600 text-white",
    accent: "border-red-200",
  },
  green: {
    outer: "from-emerald-400 via-emerald-700 to-emerald-950",
    inner: "bg-emerald-600 text-white",
    accent: "border-emerald-200",
  },
  black: {
    outer: "from-zinc-600 via-zinc-950 to-black",
    inner: "bg-zinc-950 text-white",
    accent: "border-zinc-300",
  },
  blue: {
    outer: "from-blue-400 via-blue-700 to-blue-950",
    inner: "bg-blue-600 text-white",
    accent: "border-blue-200",
  },
  purple: {
    outer: "from-purple-400 via-purple-700 to-purple-950",
    inner: "bg-purple-600 text-white",
    accent: "border-purple-200",
  },
};

function PaseChip({
  value,
  color = "white",
  selected = false,
}) {
  const chipColor = chipColors[color] ?? chipColors.white;
  const selectedClass = selected
    ? "scale-105 ring-2 ring-amber-200 ring-offset-2 ring-offset-emerald-950"
    : "";

  return (
    <button
      type="button"
      className={`group relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-gradient-to-br ${chipColor.outer} shadow-[0_12px_28px_rgba(0,0,0,0.32),inset_0_2px_8px_rgba(255,255,255,0.28)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.38),0_0_22px_rgba(251,191,36,0.18),inset_0_2px_8px_rgba(255,255,255,0.32)] ${selectedClass}`}
      aria-pressed={selected}
    >
      <span className="absolute inset-1.5 rounded-full border border-white/80" />
      <span className="absolute inset-3 rounded-full border border-white/45" />
      <span className="absolute left-3 top-2 h-4 w-7 rounded-full bg-white/28 blur-sm transition group-hover:bg-white/38" />

      <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border ${chipColor.accent} ${chipColor.inner} text-sm font-black shadow-[inset_0_2px_5px_rgba(255,255,255,0.24)]`}>
        {value}
      </span>
    </button>
  );
}

export {
  PaseChip,
};

export default PaseChip;
