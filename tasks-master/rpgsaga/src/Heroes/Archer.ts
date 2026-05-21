import { BurningEffect } from "../Effects/BurningEffect";
import { Hero } from "./Hero";
import { HeroType } from "./HeroType";

export class Archer extends Hero {
    private fireArrowsUsed: boolean = false;

    public constructor(name: string, health: number, power: number) {
        super(name, health, power, HeroType.Archer);
    }

    public useAbility(enemy: Hero): string {
        if (this.fireArrowsUsed) {
            return `(${this.type}) ${this.name} уже использовал Огненные стрелы`;
        }

        this.fireArrowsUsed = true;
        enemy.addEffect(new BurningEffect());

        return `(${this.type}) ${this.name} использует Огненные стрелы. (${enemy.type}) ${enemy.name} начинает гореть`;
    }
}