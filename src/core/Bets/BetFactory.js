import Bet from "./Bet";

class BetFactory {
  static create(data) {
    return new Bet(data);
  }

  static createMany(bets = []) {
    return bets.map((bet) => this.create(bet));
  }
}

export default BetFactory;