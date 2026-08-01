class EngineSerializer {
  constructor({
    manager = null,
  } = {}) {
    this.manager = manager;
    this.serializedData = null;
    this.lastExport = null;
    this.lastImport = null;
  }

  setManager(manager) {
    this.manager = manager;

    return this;
  }

  export(data = {}) {
    if (!this.manager) {
      throw new Error(
        "EngineSerializer requiere manager."
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      data,
    };

    this.serializedData = JSON.stringify(payload);
    this.lastExport = new Date().toISOString();

    return this.serializedData;
  }

  import(serialized) {
    if (
      typeof serialized !== "string" ||
      serialized.trim() === ""
    ) {
      throw new Error(
        "El serialized debe ser un string no vacio."
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(serialized);
    } catch (error) {
      throw new Error(
        "El serialized debe contener JSON valido."
      );
    }

    this.serializedData = serialized;
    this.lastImport = new Date().toISOString();

    return parsed;
  }

  getSerializedData() {
    return this.serializedData;
  }

  getLastExport() {
    return this.lastExport;
  }

  getLastImport() {
    return this.lastImport;
  }

  clear() {
    this.serializedData = null;
    this.lastExport = null;
    this.lastImport = null;

    return true;
  }

  getStatus() {
    return {
      manager: !!this.manager,
      hasSerializedData: this.serializedData !== null,
      hasLastExport: this.lastExport !== null,
      hasLastImport: this.lastImport !== null,
    };
  }

  reset() {
    this.manager = null;
    this.serializedData = null;
    this.lastExport = null;
    this.lastImport = null;

    return true;
  }

  toJSON() {
    return {
      status: this.getStatus(),
      serializedData: this.serializedData,
      lastExport: this.lastExport,
      lastImport: this.lastImport,
    };
  }
}

export default EngineSerializer;
