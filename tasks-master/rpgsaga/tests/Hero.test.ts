import { describe, expect, test } from "vitest";
import { Knight } from "../src/Heroes/Knight";

describe("Hero", () => {
    test("уменьшает здоровье при получении урона", () => {
        const hero = new Knight("Артур", 100, 20);

        hero.takeDamage(30);

        expect(hero.getHealth()).toBe(70);
    });

    test("здоровье не может быть меньше нуля", () => {
        const hero = new Knight("Артур", 50, 20);

        hero.takeDamage(100);

        expect(hero.getHealth()).toBe(0);
    });
});