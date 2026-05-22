import { Hero } from "./heroes.js";
import { Logger } from "./logger.js";

export class Game {
  constructor(
    private heroes: Hero[],
    private logger: Logger,
    private random: () => number = Math.random,
  ) {}

  play() {
    let round = 1;

    while (this.heroes.length > 1) {
      this.logger.log(`Кон ${round}.`);
      const pairs = this.createPairs(this.heroes);
      const winners: Hero[] = [];

      for (const [firstHero, secondHero] of pairs) {
        const winner = this.fight(firstHero, secondHero);
        winners.push(winner);
        this.logger.log();
      }

      this.heroes = winners;
      round += 1;
    }

    const winner = this.heroes[0];
    this.logger.log(`Победитель: ${winner.getFullName()}`);
    return winner;
  }

  fight(firstHero: Hero, secondHero: Hero) {
    firstHero.resetBeforeFight();
    secondHero.resetBeforeFight();

    this.logger.log(`${firstHero.getFullName()} vs ${secondHero.getFullName()}`);

    let attacker = firstHero;
    let defender = secondHero;

    while (firstHero.isAlive() && secondHero.isAlive()) {
      const logs = attacker.makeMove(defender, this.random);

      for (const log of logs) {
        this.logger.log(log);
      }

      const nextAttacker = defender;
      defender = attacker;
      attacker = nextAttacker;
    }

    return firstHero.isAlive() ? firstHero : secondHero;
  }

  private createPairs(heroes: Hero[]) {
    const mixedHeroes = [...heroes].sort(() => this.random() - 0.5);
    const pairs: [Hero, Hero][] = [];

    for (let i = 0; i < mixedHeroes.length; i += 2) {
      pairs.push([mixedHeroes[i], mixedHeroes[i + 1]]);
    }

    return pairs;
  }
}
