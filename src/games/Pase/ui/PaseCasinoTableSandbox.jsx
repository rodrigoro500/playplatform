import { useEffect } from "react";
import PaseTableCenter from "./PaseTableCenter";
import PasePlayerSeats from "./PasePlayerSeats";

function PaseCasinoTableSandbox() {
  useEffect(() => {
    const mesa = "PaseCasinoTable";
    const centro = "PaseTableCenter";
    const jugadores = "PasePlayerSeats";

    console.log("Mesa");
    console.log(mesa);
    console.log("Centro");
    console.log(centro);
    console.log("Jugadores");
    console.log(jugadores);
    console.log("===== CASINO TABLE V2 OK =====");
  }, []);

  return (
    <main className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#07100b] px-4 py-8 text-white">
      <div className="relative flex w-full max-w-6xl items-center justify-center">
        <div className="absolute h-[62vw] max-h-[680px] min-h-[320px] w-[96vw] max-w-6xl rounded-[999px] bg-amber-300/10 blur-3xl" />

        <div className="relative aspect-[1.65/1] w-full max-w-6xl rounded-[999px] border-[10px] border-[#c99a2e] bg-[linear-gradient(145deg,#241704_0%,#d9ad42_18%,#7a4c0b_42%,#f2d06b_68%,#6e4309_100%)] p-3 shadow-[0_36px_110px_rgba(0,0,0,0.58),0_0_50px_rgba(234,179,8,0.08)] sm:border-[14px] sm:p-4 lg:border-[18px] lg:p-5">
          <div className="relative flex h-full w-full rounded-[999px] border-[5px] border-emerald-300/70 bg-[radial-gradient(circle_at_50%_42%,#17633e_0%,#0f4a31_38%,#0a3223_70%,#061c14_100%)] p-4 shadow-[inset_0_0_52px_rgba(16,185,129,0.2),inset_0_0_120px_rgba(0,0,0,0.34)] sm:p-6 lg:p-9">
            <div className="relative h-full w-full rounded-[999px] border border-emerald-100/18 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_42%,rgba(0,0,0,0.18)_100%)]">
              <div className="absolute inset-[8%] rounded-[999px] border border-amber-100/15" />
              <div className="absolute inset-[18%] rounded-[999px] border border-emerald-200/15" />

              <div className="absolute inset-[9%] z-10">
                <PaseTableCenter />
              </div>

              <PasePlayerSeats />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PaseCasinoTableSandbox;
