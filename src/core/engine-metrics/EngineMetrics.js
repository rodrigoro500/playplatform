class EngineMetrics {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.metrics = new Map();
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineMetrics requiere manager."
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
        "El nombre de la metrica debe ser un string no vacio."
      );
    }
  }

  setMetric(
    name,
    value
  ) {
    this.validateName(name);
    this.metrics.set(
      name,
      value
    );

    return this;
  }

  getMetric(name) {
    this.validateName(name);

    if (!this.metrics.has(name)) {
      return null;
    }

    return this.metrics.get(name);
  }

  hasMetric(name) {
    this.validateName(name);

    return this.metrics.has(name);
  }

  removeMetric(name) {
    this.validateName(name);
    this.metrics.delete(name);

    return true;
  }

  clearMetrics() {
    this.metrics.clear();

    return true;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      metrics: this.metrics.size,
    };
  }

  reset() {
    this.manager = null;
    this.metrics = new Map();
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      metrics: Object.fromEntries(this.metrics),
    };
  }
}

export default EngineMetrics;
