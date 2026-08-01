class PaseTableLayoutEvents {
  static PASE_TABLE_LAYOUT_RENDERED = "PASE_TABLE_LAYOUT_RENDERED";
  static PASE_TABLE_LAYOUT_UPDATED = "PASE_TABLE_LAYOUT_UPDATED";
  static PASE_TABLE_LAYOUT_DESTROYED = "PASE_TABLE_LAYOUT_DESTROYED";

  static createPaseTableLayoutRenderedEvent() {
    return {
      type: this.PASE_TABLE_LAYOUT_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableLayoutUpdatedEvent() {
    return {
      type: this.PASE_TABLE_LAYOUT_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseTableLayoutDestroyedEvent() {
    return {
      type: this.PASE_TABLE_LAYOUT_DESTROYED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseTableLayoutEvents;
