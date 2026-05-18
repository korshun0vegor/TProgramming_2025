import { describe, expect, test } from "vitest";
import { Archer } from "../src/Heroes/Archer";
import { Knight } from "../src/Heroes/Knight";

describe("Archer", () => {
    test("Огненные стрелы накладывают эффект горения", () => {
        const archer = new Archer("Леголас", 80, 15);
        const knight = new Knight("Артур", 100, 20);

        archer.useAbility(knight);

        const logs = knight.applyEffects();

        expect(knight.getHealth()).toBe(98);
        expect(logs.length).toBe(1);
    });
});