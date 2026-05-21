import { Hero } from "../Heroes/Hero";
import { Logger } from "../Logger/Logger";

export class Battle {
    private readonly logger: Logger;

    public constructor(logger: Logger) {
        this.logger = logger;
    }

    public fight(firstHero: Hero, secondHero: Hero): Hero {
        this.logger.log(
            `(${firstHero.type}) ${firstHero.name} vs (${secondHero.type}) ${secondHero.name}`
        );

        let attacker: Hero = firstHero;
        let defender: Hero = secondHero;

        while (firstHero.isAlive() && secondHero.isAlive()) {
            this.executeTurn(attacker, defender);

            if (!defender.isAlive()) {
                break;
            }

            [attacker, defender] = [defender, attacker];
        }

        const winner = firstHero.isAlive() ? firstHero : secondHero;

        this.logger.log(
            `Победитель: (${winner.type}) ${winner.name}`
        );
        this.logger.log("");

        return winner;
    }

    private executeTurn(attacker: Hero, defender: Hero): void {
        const effectLogs = attacker.applyEffects();
        this.logger.logMany(effectLogs);

        if (!attacker.isAlive()) {
            return;
        }

        if (attacker.shouldSkipNextTurn()) {
            this.logger.log(
                `(${attacker.type}) ${attacker.name} пропускает ход`
            );

            attacker.resetSkipNextTurn();
            return;
        }

        const useAbility = Math.random() < 0.3;

        if (useAbility) {
            const abilityLog = attacker.useAbility(defender);
            this.logger.log(abilityLog);
        } else {
            const damage = attacker.attack();
            defender.takeDamage(damage);

            this.logger.log(
                `(${attacker.type}) ${attacker.name} наносит ${damage} урона (${defender.type}) ${defender.name}`
            );
        }

        if (!defender.isAlive()) {
            this.logger.log(
                `(${defender.type}) ${defender.name} погибает`
            );
        }
    }
}