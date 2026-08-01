class EnginePipeline {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.stages = [];
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EnginePipeline requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  addStage(stage) {
    if (stage === undefined) {
      throw new Error(
        "La etapa no puede ser undefined."
      );
    }

    this.stages.push(stage);

    return stage;
  }

  removeStage(stage) {
    const index =
      this.stages.indexOf(stage);

    if (index === -1) {
      throw new Error(
        "La etapa no existe."
      );
    }

    this.stages.splice(
      index,
      1
    );

    return true;
  }

  getStage(index) {
    if (
      index < 0 ||
      index >= this.stages.length
    ) {
      return null;
    }

    return this.stages[index];
  }

  hasStages() {
    return this.stages.length > 0;
  }

  size() {
    return this.stages.length;
  }

  getStages() {
    return [...this.stages];
  }

  clear() {
    this.stages = [];

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      stages: this.stages.length,
      hasStages: this.stages.length > 0,
    };
  }

  reset() {
    this.manager = null;
    this.stages = [];
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      stages: this.stages.length,
      hasStages: this.stages.length > 0,
      pipeline: [...this.stages],
    };
  }
}

export default EnginePipeline;
