import { useEffect } from "react";
import PaseChip from "./PaseChip";
import PaseBetSpot from "../bets/PaseBetSpot";

const chips = [
  {
    value: 1,
    color: "white",
  },
  {
    value: 5,
    color: "red",
  },
  {
    value: 10,
    color: "green",
  },
  {
    value: 25,
    color: "blue",
  },
  {
    value: 50,
    color: "black",
  },
  {
    value: 100,
    color: "purple",
  },
  {
    value: 500,
    color: "red",
  },
  {
    value: 1000,
    color: "black",
  },
];

const betSpots = [
  {
    title: "PASE",
    chips: [
      {
        value: 25,
        color: "blue",
      },
      {
        value: 25,
        color: "blue",
      },
      {
        value: 100,
        color: "purple",
      },
    ],
  },
  {
    title: "KULO",
    chips: [
      {
        value: 5,
        color: "red",
      },
      {
        value: 10,
        color: "green",
      },
      {
        value: 10,
        color: "green",
      },
      {
        value: 50,
        color: "black",
      },
    ],
  },
  {
    title: "CENTRO",
    chips: [
      {
        value: 1,
        color: "white",
      },
      {
        value: 5,
        color: "red",
      },
      {
        value: 10,
        color: "green",
      },
      {
        value: 25,
        color: "blue",
      },
      {
        value: 50,
        color: "black",
      },
      {
        value: 100,
        color: "purple",
      },
      {
        value: 500,
        color: "red",
      },
      {
        value: 1000,
        color: "black",
      },
    ],
  },
];

function PaseChipSandbox() {
  useEffect(() => {
    console.log("===== CHIP SYSTEM V1 OK =====");
  }, []);

  return (
    <main className="min-h-screen w-full bg-[#07100b] px-5 py-8 text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 rounded-[2rem] border border-amber-100/20 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.18),transparent_42%),rgba(0,0,0,0.28)] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          {chips.map((chip) => (
            <PaseChip
              key={chip.value}
              value={chip.value}
              color={chip.color}
            />
          ))}
        </div>

        <div className="grid w-full max-w-4xl gap-8 md:grid-cols-3">
          {betSpots.map((spot) => (
            <PaseBetSpot
              key={spot.title}
              title={spot.title}
              chips={spot.chips}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default PaseChipSandbox;
