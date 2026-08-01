class LifecycleManager {
  static STATES = [
    "CREATED",
    "INITIALIZED",
    "STARTED",
    "PAUSED",
    "STOPPED",
    "DESTROYED",
  ];

  constructor() {
    this.components = new Map();
  }

  validateId(id) {
    if (
      typeof id !== "string" ||
      id.trim() === ""
    ) {
      throw new Error(
        "El id del componente debe ser un string no vacio."
      );
    }
  }

  validateMetadata(metadata) {
    if (
      metadata === null ||
      typeof metadata !== "object" ||
      Array.isArray(metadata)
    ) {
      throw new Error(
        "La metadata del componente debe ser un objeto valido."
      );
    }
  }

  validateState(state) {
    if (!LifecycleManager.STATES.includes(state)) {
      throw new Error(
        "El estado del componente no es valido."
      );
    }
  }

  createTimestamp() {
    return new Date().toISOString();
  }

  registerComponent(
    id,
    instance,
    metadata = {}
  ) {
    this.validateId(id);
    this.validateMetadata(metadata);

    if (this.hasComponent(id)) {
      throw new Error(
        "Ya existe un componente con ese id."
      );
    }

    const timestamp =
      this.createTimestamp();

    const component = {
      id,
      instance,
      state: "CREATED",
      metadata: {
        ...metadata,
      },
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    this.components.set(
      id,
      component
    );

    return component;
  }

  unregisterComponent(id) {
    const component =
      this.getComponent(id);

    this.components.delete(id);

    return component;
  }

  getComponent(id) {
    this.validateId(id);

    const component =
      this.components.get(id);

    if (!component) {
      throw new Error(
        "No existe un componente con ese id."
      );
    }

    return component;
  }

  getComponentInstance(id) {
    return this
      .getComponent(id)
      .instance;
  }

  hasComponent(id) {
    this.validateId(id);

    return this.components.has(id);
  }

  executeHook(
    component,
    hookName
  ) {
    if (
      component.instance &&
      typeof component.instance[hookName] === "function"
    ) {
      component.instance[hookName]();
    }
  }

  initializeComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "initialize"
    );

    return this.setComponentState(
      id,
      "INITIALIZED"
    );
  }

  startComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "start"
    );

    return this.setComponentState(
      id,
      "STARTED"
    );
  }

  pauseComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "pause"
    );

    return this.setComponentState(
      id,
      "PAUSED"
    );
  }

  resumeComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "resume"
    );

    return this.setComponentState(
      id,
      "STARTED"
    );
  }

  stopComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "stop"
    );

    return this.setComponentState(
      id,
      "STOPPED"
    );
  }

  destroyComponent(id) {
    const component =
      this.getComponent(id);

    this.executeHook(
      component,
      "destroy"
    );

    return this.setComponentState(
      id,
      "DESTROYED"
    );
  }

  setComponentState(
    id,
    state
  ) {
    this.validateState(state);

    const component =
      this.getComponent(id);

    component.state = state;
    component.updatedAt =
      this.createTimestamp();

    return component;
  }

  updateMetadata(
    id,
    metadata
  ) {
    this.validateMetadata(metadata);

    const component =
      this.getComponent(id);

    component.metadata = {
      ...component.metadata,
      ...metadata,
    };
    component.updatedAt =
      this.createTimestamp();

    return component;
  }

  getComponents() {
    return Array.from(
      this.components.values()
    );
  }

  getComponentsByState(state) {
    this.validateState(state);

    return this
      .getComponents()
      .filter(component =>
        component.state === state
      );
  }

  count() {
    return this.components.size;
  }

  clear() {
    this.components.clear();
  }

  serializeInstance(instance) {
    if (typeof instance === "function") {
      return null;
    }

    if (
      instance === null ||
      typeof instance !== "object"
    ) {
      return instance;
    }

    return Object.fromEntries(
      Object
        .entries(instance)
        .filter(([, value]) =>
          typeof value !== "function"
        )
    );
  }

  toJSON() {
    return {
      components: this
        .getComponents()
        .map(component => ({
          id: component.id,
          instance: this.serializeInstance(
            component.instance
          ),
          state: component.state,
          metadata: {
            ...component.metadata,
          },
          createdAt: component.createdAt,
          updatedAt: component.updatedAt,
        })),
    };
  }
}

export default LifecycleManager;
