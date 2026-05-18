import { Hero } from "./Hero";
import { HeroType } from "./HeroType";

export class Knight extends Hero {
    public constructor(name: string, health: number, power: number) {
        super(name, health, power, HeroType.Knight);
    }

    public useAbility(enemy: Hero): string {
        const damage = Math.floor(this.power * 1.3);

        enemy.takeDamage(damage);

        return `(${this.type}) ${this.name} использует Удар возмездия и наносит ${damage} урона (${enemy.type}) ${enemy.name}`;
    }
}
