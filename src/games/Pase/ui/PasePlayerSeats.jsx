const players = [
  {
    id: "P1",
    name: "Jugador 1",
    position: "left-[12%] top-[18%] -rotate-[-8deg]",
  },
  {
    id: "P2",
    name: "Jugador 2",
    position: "left-1/2 top-[7%] -translate-x-1/2",
  },
  {
    id: "P3",
    name: "Jugador 3",
    position: "right-[12%] top-[18%] rotate-[8deg]",
  },
  {
    id: "P4",
    name: "Jugador 4",
    position: "right-[10%] bottom-[17%] rotate-[-9deg]",
  },
  {
    id: "P5",
    name: "Jugador 5",
    position: "left-1/2 bottom-[6%] -translate-x-1/2",
  },
  {
    id: "P6",
    name: "Jugador 6",
    position: "left-[10%] bottom-[17%] rotate-[9deg]",
  },
];

function PasePlayerSeats() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {players.map((player) => (
        <div
          key={player.id}
          className={`absolute ${player.position}`}
        >
          <div className="pointer-events-auto w-28 rounded-[1.25rem] border border-amber-200/45 bg-[#07120d]/82 p-3 text-center shadow-[0_18px_42px_rgba(0,0,0,0.36),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:w-32 sm:p-4">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-amber-100/45 bg-[radial-gradient(circle_at_35%_30%,#245d3d,#092017)] text-xs font-bold uppercase tracking-[0.12em] text-amber-100 shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
              {player.id}
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.75)]" />
              <span className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">
                {player.name}
              </span>
            </div>

            <div className="mt-3 rounded-full border border-amber-100/25 bg-black/25 px-2 py-2">
              <div className="mx-auto flex h-5 max-w-16 items-center justify-center gap-1">
                <span className="h-4 w-4 rounded-full border border-amber-100/50 bg-amber-300 shadow-[0_4px_12px_rgba(251,191,36,0.25)]" />
                <span className="h-4 w-4 rounded-full border border-red-100/40 bg-red-500 shadow-[0_4px_12px_rgba(239,68,68,0.2)]" />
                <span className="h-4 w-4 rounded-full border border-emerald-100/40 bg-emerald-400 shadow-[0_4px_12px_rgba(52,211,153,0.2)]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export {
  PasePlayerSeats,
};

export default PasePlayerSeats;
