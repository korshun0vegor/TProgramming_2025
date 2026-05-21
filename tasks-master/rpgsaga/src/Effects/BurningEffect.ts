import { Hero } from "../Heroes/Hero";
import type { Effect } from "./Effect";

export class BurningEffect implements Effect {
    public name: string = "Горение";
    public turnsLeft: number;
    private readonly damagePerTurn: number;

    public constructor(turnsLeft: number = 3, damagePerTurn: number = 2) {
        this.turnsLeft = turnsLeft;
        this.damagePerTurn = damagePerTurn;
    }

    public apply(target: Hero): string {
        target.takeDamage(this.damagePerTurn);
        this.turnsLeft--;

        return `(${target.type}) ${target.name} получает ${this.damagePerTurn} урона от эффекта "${this.name}"`;
    }

    public isExpired(): boolean {
        return this.turnsLeft <= 0;
    }
}