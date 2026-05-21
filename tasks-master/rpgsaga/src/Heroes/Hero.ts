import { HeroType } from "./HeroType";
import type { Effect } from "../Effects/Effect";

export abstract class Hero {
    protected health: number;
    protected power: number;
    protected skipNextTurn: boolean = false;
    protected effects: Effect[] = [];

    public readonly name: string;
    public readonly type: HeroType;


    protected constructor(name: string, health: number, power: number, type: HeroType) {
        this.name = name;
        this.health = health;
        this.power = power;
        this.type = type;
    }

    public getHealth(): number {
        return this.health;
    }

    public getPower(): number {
        return this.power;
    }

    public isAlive(): boolean {
        return this.health > 0;
    }

    public takeDamage(damage: number): void {
        this.health -= damage;

        if (this.health < 0) {
            this.health = 0;
        }
    }

    public attack(): number {
        return this.power;
    }

    public setSkipNextTurn(value: boolean): void {
        this.skipNextTurn = value;
    }

    public shouldSkipNextTurn(): boolean {
        return this.skipNextTurn;
    }

    public resetSkipNextTurn(): void {
        this.skipNextTurn = false;
    }

    public addEffect(effect: Effect): void {
        this.effects.push(effect);
    }

    public applyEffects(): string[] {
        const logs: string[] = [];

        for (const effect of this.effects) {
            logs.push(effect.apply(this));
        }

        this.effects = this.effects.filter(effect => !effect.isExpired());

        return logs;
    }
    public abstract useAbility(enemy: Hero): string;
}