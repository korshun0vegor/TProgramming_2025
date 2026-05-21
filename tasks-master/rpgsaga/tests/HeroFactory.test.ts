import { describe, expect, test } from "vitest";
import { HeroFactory } from "../src/Factory/HeroFactory";
import { HeroType } from "../src/Heroes/HeroType";

describe("HeroFactory", () => {
    test("создаёт рыцаря", () => {
        const factory = new HeroFactory();

        const hero = factory.createHero(HeroType.Knight, "Артур", 100, 20);

        expect(hero.name).toBe("Артур");
        expect(hero.getHealth()).toBe(100);
        expect(hero.getPower()).toBe(20);
        expect(hero.type).toBe(HeroType.Knight);
    });
});