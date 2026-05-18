import { describe, expect, test } from "vitest";
import { Knight } from "../src/Heroes/Knight";
import { Mage } from "../src/Heroes/Mage";

describe("Mage", () => {
    test("способность Заворожение заставляет противника пропустить ход", () => {
        const mage = new Mage("Гэндальф", 80, 15);
        const knight = new Knight("Артур", 100, 20);

        mage.useAbility(knight);

        expect(knight.shouldSkipNextTurn()).toBe(true);
    });
});