class Statistics {
  constructor() {
    this.counters = new Map();
  }

  validateKey(key) {
    if (
      typeof key !== "string" ||
      key.trim() === ""
    ) {
      throw new Error(
        "La clave de la estadistica debe ser un string no vacio."
      );
    }
  }

  validateValue(value) {
    if (
      typeof value !== "number" ||
      !Number.isFinite(value)
    ) {
      throw new Error(
        "El valor de la estadistica debe ser un numero finito."
      );
    }
  }

  increment(
    key,
    amount = 1
  ) {
    this.validateKey(key);
    this.validateValue(amount);

    const value =
      this.get(key) + amount;

    this.counters.set(
      key,
      value
    );

    return value;
  }

  decrement(
    key,
    amount = 1
  ) {
    this.validateKey(key);
    this.validateValue(amount);

    const value =
      this.get(key) - amount;

    this.counters.set(
      key,
      value
    );

    return value;
  }

  set(
    key,
    value
  ) {
    this.validateKey(key);
    this.validateValue(value);

    this.counters.set(
      key,
      value
    );

    return value;
  }

  get(key) {
    this.validateKey(key);

    if (!this.counters.has(key)) {
      return 0;
    }

    return this.counters.get(key);
  }

  has(key) {
    this.validateKey(key);

    return this.counters.has(key);
  }

  remove(key) {
    this.validateKey(key);

    return this.counters.delete(key);
  }

  reset(key) {
    this.validateKey(key);

    this.counters.set(
      key,
      0
    );

    return 0;
  }

  clear() {
    this.counters.clear();
  }

  getAll() {
    return Object.fromEntries(
      this.counters
    );
  }

  getKeys() {
    return Array.from(
      this.counters.keys()
    );
  }

  count() {
    return this.counters.size;
  }

  toJSON() {
    return this.getAll();
  }
}

export default Statistics;
