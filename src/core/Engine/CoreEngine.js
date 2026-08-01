import EventManager from "./EventManager";
import StateManager from "./StateManager";

class CoreEngine {
  constructor() {
    this.version = "1.0.0";
    this.name = "PlayPlatform Core";

    this.currentRoom = null;
    this.currentGame = null;
    this.players = [];

    this.eventManager = new EventManager();
    this.stateManager = new StateManager("WAITING");

    this.eventManager.emit("CORE_INITIALIZED", {
      name: this.name,
      version: this.version,
      state: this.stateManager.getState(),
    });
  }

  getVersion() {
    return this.version;
  }

  getState() {
    return this.stateManager.getState();
  }

  setState(newState) {
    const previousState = this.stateManager.getState();

    this.stateManager.transition(newState);

    this.eventManager.emit("STATE_CHANGED", {
      previousState,
      currentState: newState,
    });

    return this.stateManager.getState();
  }

  registerEvent(type, data = {}) {
    return this.eventManager.emit(type, data);
  }

  getEvents() {
    return this.eventManager.getEvents();
  }
}

export default CoreEngine;