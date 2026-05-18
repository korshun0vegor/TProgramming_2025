import { describe, expect, test } from "vitest";
import { Knight } from "../src/Heroes/Knight";
import { Mage } from "../src/Heroes/Mage";

describe("Knight", () => {
    test("Удар возмездия наносит 130% от силы рыцаря", () => {
        const knight = new Knight("Артур", 100, 20);
        const mage = new Mage("Гэндальф", 100, 15);

        knight.useAbility(mage);

        expect(mage.getHealth()).toBe(74);
    });
});