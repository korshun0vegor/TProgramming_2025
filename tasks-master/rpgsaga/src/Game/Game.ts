import { HeroFactory } from "../Factory/HeroFactory";
import { Hero } from "../Heroes/Hero";
import { Logger } from "../Logger/Logger";
import { Battle } from "./Battle";

export class Game {
    private readonly heroFactory: HeroFactory;
    private readonly logger: Logger;
    private readonly battle: Battle;

    public constructor() {
        this.logger = new Logger();
        this.heroFactory = new HeroFactory();
        this.battle = new Battle(this.logger);
    }

    public start(playerCount: number): Hero {
        if (playerCount % 2 !== 0) {
            throw new Error("Количество игроков должно быть чётным");
        }

        let heroes = this.heroFactory.createRandomHeroes(playerCount);
        let round = 1;

        while (heroes.length > 1) {
            this.logger.log(`Раунд ${round}.`);

            heroes = this.shuffle(heroes);

            const winners: Hero[] = [];

            for (let i = 0; i < heroes.length; i += 2) {
                const firstHero = heroes[i];
                const secondHero = heroes[i + 1];

                const winner = this.battle.fight(firstHero, secondHero);
                winners.push(winner);
            }

            heroes = winners;
            round++;
        }

        const champion = heroes[0];

        this.logger.log(
            `Победитель: (${champion.type}) ${champion.name}`
        );

        return champion;
    }

    private shuffle(heroes: Hero[]): Hero[] {
        const shuffled = [...heroes];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }
}