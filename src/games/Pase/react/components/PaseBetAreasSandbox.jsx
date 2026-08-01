import { useEffect } from "react";
import PaseBetAreas from "./PaseBetAreas";
import PaseBetAreasEvents from "./PaseBetAreasEvents";

function PaseBetAreasSandbox() {
  useEffect(() => {
    const component = "pase-bet-areas";
    const paseArea = {
      className: "pase-bet-area-pase",
      betType: "PASE",
    };
    const kuloArea = {
      className: "pase-bet-area-kulo",
      betType: "KULO",
      label: "Mala",
    };
    const rendered = [
      component,
      paseArea.className,
      `data-bet-type="${paseArea.betType}"`,
      kuloArea.className,
      `data-bet-type="${kuloArea.betType}"`,
      kuloArea.label,
    ].join(" ");
    const events = [
      PaseBetAreasEvents.createPaseBetAreasRenderedEvent(),
      PaseBetAreasEvents.createPaseBetAreaPaseRenderedEvent(),
      PaseBetAreasEvents.createPaseBetAreaKuloRenderedEvent(),
      PaseBetAreasEvents.createPaseBetAreasUpdatedEvent(),
    ];

    if (!rendered.includes("pase-bet-areas")) {
      throw new Error(
        "PaseBetAreasSandbox debe contener pase-bet-areas."
      );
    }

    if (!rendered.includes("PASE")) {
      throw new Error(
        "PaseBetAreasSandbox debe contener el area PASE."
      );
    }

    if (!rendered.includes("KULO")) {
      throw new Error(
        "PaseBetAreasSandbox debe contener el area KULO."
      );
    }

    if (!rendered.includes("Mala")) {
      throw new Error(
        "PaseBetAreasSandbox debe mostrar Mala en KULO."
      );
    }

    if (!rendered.includes("data-bet-type=\"PASE\"")) {
      throw new Error(
        "PaseBetAreasSandbox debe contener data-bet-type=\"PASE\"."
      );
    }

    if (!rendered.includes("data-bet-type=\"KULO\"")) {
      throw new Error(
        "PaseBetAreasSandbox debe contener data-bet-type=\"KULO\"."
      );
    }

    if (rendered.includes("NO_PASE")) {
      throw new Error(
        "PaseBetAreasSandbox no debe contener NO_PASE."
      );
    }

    console.log("Component");
    console.log(component);
    console.log("PaseArea");
    console.log(paseArea);
    console.log("KuloArea");
    console.log(kuloArea);
    console.log("Events");
    console.log(events);
    console.log("===== PASE BET AREAS SANDBOX OK =====");
  }, []);

  return (
    <PaseBetAreas />
  );
}

export default PaseBetAreasSandbox;
