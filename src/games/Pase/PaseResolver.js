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
        winner: "KULO",
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
  const activePoint = this.point;

  if (this.rules.isPointWin(total, activePoint)) {
    this.clearPoint();

    return {
      finished: true,
      winner: "SUERTE",
      point: activePoint,
    };
  }

  if (total === 7) {
    this.clearPoint();

    return {
      finished: true,
      winner: "KULO",
      point: activePoint,
    };
  }

  return {
    finished: false,
    winner: null,
    point: activePoint,
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
