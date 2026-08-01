class PasePlayerSeatsEvents {
  static PASE_PLAYER_SEATS_RENDERED = "PASE_PLAYER_SEATS_RENDERED";
  static PASE_PLAYER_SEATS_UPDATED = "PASE_PLAYER_SEATS_UPDATED";
  static PASE_PLAYER_SEATS_EMPTY = "PASE_PLAYER_SEATS_EMPTY";

  static createPasePlayerSeatsRenderedEvent() {
    return {
      type: this.PASE_PLAYER_SEATS_RENDERED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPasePlayerSeatsUpdatedEvent() {
    return {
      type: this.PASE_PLAYER_SEATS_UPDATED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPasePlayerSeatsEmptyEvent() {
    return {
      type: this.PASE_PLAYER_SEATS_EMPTY,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PasePlayerSeatsEvents;
