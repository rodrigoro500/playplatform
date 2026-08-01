class EngineFlowController {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.steps = [];
    this.currentStep = -1;
    this.initialized = false;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  initialize() {
    if (!this.manager) {
      throw new Error(
        "EngineFlowController requiere manager."
      );
    }

    this.initialized = true;

    return true;
  }

  isInitialized() {
    return this.initialized;
  }

  addStep(step) {
    if (step === undefined) {
      throw new Error(
        "El paso no puede ser undefined."
      );
    }

    this.steps.push(step);

    if (this.currentStep === -1) {
      this.currentStep = 0;
    }

    return step;
  }

  nextStep() {
    if (!this.hasSteps()) {
      return null;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep += 1;
    }

    return this.getCurrentStep();
  }

  previousStep() {
    if (!this.hasSteps()) {
      return null;
    }

    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }

    return this.getCurrentStep();
  }

  getCurrentStep() {
    if (this.currentStep === -1) {
      return null;
    }

    return this.steps[this.currentStep];
  }

  getStep(index) {
    if (
      index < 0 ||
      index >= this.steps.length
    ) {
      return null;
    }

    return this.steps[index];
  }

  hasSteps() {
    return this.steps.length > 0;
  }

  size() {
    return this.steps.length;
  }

  getSteps() {
    return [...this.steps];
  }

  clear() {
    this.steps = [];
    this.currentStep = -1;

    return true;
  }

  getStatus() {
    return {
      initialized: this.initialized,
      steps: this.steps.length,
      currentStep: this.currentStep,
    };
  }

  reset() {
    this.manager = null;
    this.steps = [];
    this.currentStep = -1;
    this.initialized = false;

    return true;
  }

  toJSON() {
    return {
      initialized: this.initialized,
      currentStep: this.currentStep,
      steps: [...this.steps],
    };
  }
}

export default EngineFlowController;
