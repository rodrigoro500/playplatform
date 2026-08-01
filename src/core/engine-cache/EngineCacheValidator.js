class EngineCacheValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineCache manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineCache manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineCache initialized debe ser boolean."
      );
    }
  }

  static validateCacheKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave de cache debe ser un string no vacio."
      );
    }
  }

  static validateCacheValue(value) {
    if (value === undefined) {
      throw new Error(
        "El valor de cache no puede ser undefined."
      );
    }
  }

  static validateCache(cache) {
    if (!(cache instanceof Map)) {
      throw new Error(
        "cache debe ser una instancia de Map."
      );
    }

    cache.forEach((value, key) => {
      EngineCacheValidator.validateCacheKey(key);
      EngineCacheValidator.validateCacheValue(value);
    });
  }

  static validateEngineCache(engineCache) {
    if (
      engineCache === null ||
      typeof engineCache !== "object"
    ) {
      throw new Error(
        "EngineCache debe ser un objeto valido."
      );
    }

    EngineCacheValidator.validateManager(
      engineCache.manager
    );
    EngineCacheValidator.validateInitialized(
      engineCache.initialized
    );
    EngineCacheValidator.validateCache(
      engineCache.cache
    );
  }
}

export default EngineCacheValidator;
