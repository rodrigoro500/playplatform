import { useEffect } from "react";
import PaseTableLayout from "./PaseTableLayout";
import PaseTableLayoutEvents from "./PaseTableLayoutEvents";

function PaseTableLayoutSandbox() {
  useEffect(() => {
    const layout = "pase-table-layout";
    const children = "Contenido de prueba";
    const rendered =
      layout === "pase-table-layout" &&
      children === "Contenido de prueba";
    const events = [
      PaseTableLayoutEvents.createPaseTableLayoutRenderedEvent(),
      PaseTableLayoutEvents.createPaseTableLayoutUpdatedEvent(),
      PaseTableLayoutEvents.createPaseTableLayoutDestroyedEvent(),
    ];

    if (!rendered) {
      throw new Error(
        "PaseTableLayoutSandbox no renderizo correctamente."
      );
    }

    console.log("Layout");
    console.log(layout);
    console.log("Children");
    console.log(children);
    console.log("Events");
    console.log(events);
    console.log("===== PASE TABLE LAYOUT SANDBOX OK =====");
  }, []);

  return (
    <PaseTableLayout>
      <div>
        Contenido de prueba
      </div>
    </PaseTableLayout>
  );
}

export default PaseTableLayoutSandbox;
