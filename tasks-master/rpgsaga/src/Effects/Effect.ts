import { Hero } from "../Heroes/Hero";

export interface Effect {
    name: string;
    turnsLeft: number;

    apply(target: Hero): string;
    isExpired(): boolean;
}