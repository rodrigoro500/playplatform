import PaseRules from "./PaseRules";

class PaseResolver {
  constructor() {
    this.point = null;
    this.rules = new PaseRules();
  }

  resolve(result) {
    const total = result.total;

    if (!this.hasPoint()) {
      return this.resolveFirstRoll(total);
    }

    return this.resolvePointRoll(total);
  }

  resolveFirstRoll(total) {
    if (this.rules.isInitialSuerteWin(total)) {
      return {
        finished: true,
        winner: "SUERTE",
        point: null,
      };
    }

    if (this.rules.isInitialMalaWin(total)) {
      return {
        finished: true,
        winner: "MALA",
        point: null,
      };
    }

    if (this.rules.establishesPoint(total)) {
      this.setPoint(total);

      return {
        finished: false,
        winner: null,
        point: total,
      };
    }

    throw new Error(`Total inválido: ${total}`);
  }

  resolvePointRoll(total) {
    if (this.rules.isInitialSuerteWin(total)) {
      const point = this.point;

      this.clearPoint();

      return {
        finished: true,
        winner: "SUERTE",
        point,
      };
    }

    if (this.rules.isInitialMalaWin(total)) {
      const point = this.point;

      this.clearPoint();

      return {
        finished: true,
        winner: "MALA",
        point,
      };
    }

    if (this.rules.isPointWin(total, this.point)) {
      const point = this.point;

      this.clearPoint();

      return {
        finished: true,
        winner: "SUERTE",
        point,
      };
    }

    return {
      finished: false,
      winner: null,
      point: this.point,
    };
  }

  hasPoint() {
    return this.point !== null;
  }

  getPoint() {
    return this.point;
  }

  setPoint(point) {
    this.point = point;
  }

  clearPoint() {
    this.point = null;
  }
}

export default PaseResolver;
