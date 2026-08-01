class EngineProfilerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineProfiler manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineProfiler manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineProfiler initialized debe ser boolean."
      );
    }
  }

  static validateProfile(profile) {
    if (
      profile === null ||
      typeof profile !== "object"
    ) {
      throw new Error(
        "El profile debe ser un objeto valido."
      );
    }

    if (
      typeof profile.name !== "string" ||
      profile.name.trim() === ""
    ) {
      throw new Error(
        "El nombre del profile debe ser un string no vacio."
      );
    }

    if (
      typeof profile.startTime !== "number" ||
      !Number.isFinite(profile.startTime) ||
      profile.startTime <= 0
    ) {
      throw new Error(
        "startTime del profile debe ser un numero mayor que cero."
      );
    }

    if (
      profile.endTime !== null &&
      (
        typeof profile.endTime !== "number" ||
        !Number.isFinite(profile.endTime) ||
        profile.endTime <= 0
      )
    ) {
      throw new Error(
        "endTime del profile debe ser null o un numero mayor que cero."
      );
    }

    if (
      profile.duration !== null &&
      (
        typeof profile.duration !== "number" ||
        !Number.isFinite(profile.duration) ||
        profile.duration < 0
      )
    ) {
      throw new Error(
        "duration del profile debe ser null o un numero mayor o igual que cero."
      );
    }
  }

  static validateProfiles(profiles) {
    if (!Array.isArray(profiles)) {
      throw new Error(
        "profiles debe ser un Array."
      );
    }

    profiles.forEach(profile =>
      EngineProfilerValidator.validateProfile(profile)
    );
  }

  static validateEngineProfiler(engineProfiler) {
    if (
      engineProfiler === null ||
      typeof engineProfiler !== "object"
    ) {
      throw new Error(
        "EngineProfiler debe ser un objeto valido."
      );
    }

    EngineProfilerValidator.validateManager(
      engineProfiler.manager
    );
    EngineProfilerValidator.validateInitialized(
      engineProfiler.initialized
    );
    EngineProfilerValidator.validateProfiles(
      engineProfiler.profiles
    );
  }
}

export default EngineProfilerValidator;
