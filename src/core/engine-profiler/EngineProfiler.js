class EngineProfiler {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.profiles = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineProfiler requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  validateName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre del perfil debe ser un string no vacio."
      );
    }
  }

  startProfile(name) {
    this.validateName(name);

    const profile = {
      name,
      startTime: Date.now(),
      endTime: null,
      duration: null,
    };

    this.profiles.push(profile);

    return profile;
  }

  endProfile(name) {
    this.validateName(name);

    const profile = [...this.profiles]
      .reverse()
      .find(currentProfile =>
        currentProfile.name === name &&
          currentProfile.endTime === null
      );

    if (!profile) {
      throw new Error(
        `No existe un perfil abierto con nombre ${name}.`
      );
    }

    profile.endTime = Date.now();
    profile.duration = profile.endTime - profile.startTime;

    return profile;
  }

  getProfiles() {
    return [...this.profiles];
  }

  clearProfiles() {
    this.profiles = [];

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      profiles: this.profiles.length,
    };
  }

  reset() {
    this.manager = null;
    this.profiles = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      profiles: this.profiles.length,
    };
  }
}

export default EngineProfiler;
