class PaseBetAreasEvents {
  static PASE_BET_AREAS_RENDERED = "PASE_BET_AREAS_RENDERED";
  static PASE_BET_AREA_PASE_RENDERED = "PASE_BET_AREA_PASE_RENDERED";
  static PASE_BET_AREA_KULO_RENDERED = "PASE_BET_AREA_KULO_RENDERED";
  static PASE_BET_AREAS_UPDATED = "PASE_BET_AREAS_UPDATED";

  static createPaseBetAreasRenderedEvent() {
    return {
      type: this.PASE_BET_AREAS_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseBetAreaPaseRenderedEvent() {
    return {
      type: this.PASE_BET_AREA_PASE_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {
        betType: "PASE",
      },
    };
  }

  static createPaseBetAreaKuloRenderedEvent() {
    return {
      type: this.PASE_BET_AREA_KULO_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {
        betType: "KULO",
        meaning: "MALA",
      },
    };
  }

  static createPaseBetAreasUpdatedEvent() {
    return {
      type: this.PASE_BET_AREAS_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseBetAreasEvents;
