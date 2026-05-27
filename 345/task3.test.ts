import { expect, test } from "vitest";
import { calculateY } from "./task3";

test("считает y при |x| < 1", () => {
    expect(calculateY(0.2)).toBeCloseTo(Math.acos(0.2));
});

test("считает y при |x| >= 1", () => {
    expect(calculateY(2.3)).toBeCloseTo(Math.pow(1.2, 2.3) - Math.pow(2.3, 1.2));
});
