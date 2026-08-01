import PaseChip from "./PaseChip";

function PaseChipStack({
  chips = [],
}) {
  const visibleChips = chips.slice(0, 10);
  const hiddenChips = chips.length - visibleChips.length;

  return (
    <div className="relative min-h-24 min-w-20">
      {visibleChips.map((chip, index) => (
        <div
          key={chip.id ?? index}
          className="absolute left-0"
          style={{
            bottom: `${index * 5}px`,
            zIndex: index + 1,
          }}
        >
          <PaseChip
            value={chip.value}
            color={chip.color}
            selected={chip.selected}
          />
        </div>
      ))}

      {hiddenChips > 0 && (
        <div className="absolute left-14 top-0 z-20 rounded-full border border-amber-100/60 bg-black/70 px-2.5 py-1 text-xs font-bold text-amber-100 shadow-[0_8px_20px_rgba(0,0,0,0.32)] backdrop-blur">
          +{hiddenChips}
        </div>
      )}
    </div>
  );
}

export {
  PaseChipStack,
};

export default PaseChipStack;
