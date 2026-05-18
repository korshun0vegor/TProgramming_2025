import { Hero } from "./Hero";
import { HeroType } from "./HeroType";

export class Mage extends Hero {
    public constructor(name: string, health: number, power: number) {
        super(name, health, power, HeroType.Mage);
    }

    public useAbility(enemy: Hero): string {
        enemy.setSkipNextTurn(true);

        return `(${this.type}) ${this.name} использует Заворожение. (${enemy.type}) ${enemy.name} пропустит следующий ход`;
    }
}