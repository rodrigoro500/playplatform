class BetSettlement {
  constructor() {
    this.results = [];
  }

  add(result) {
    this.results.push(result);

    return result;
  }

  addMany(results = []) {
    results.forEach((result) =>
      this.add(result)
    );

    return this.results;
  }

  getResults() {
    return [...this.results];
  }

  clear() {
    this.results = [];
  }

  count() {
    return this.results.length;
  }

  isEmpty() {
    return this.results.length === 0;
  }

  getTotalPayout() {
    return this.results.reduce(
      (total, result) =>
        total + result.getPayout(),
      0
    );
  }

  getTotalProfit() {
    return this.results.reduce(
      (total, result) =>
        total + result.getProfit(),
      0
    );
  }
}

export default BetSettlement;