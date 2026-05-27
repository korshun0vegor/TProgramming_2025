import { expect, test } from "vitest";
import { calculateY } from "./task4";

test("считает y для значения из массива задачи B", () => {
    expect(calculateY(2.3)).toBeCloseTo(Math.pow(1.2, 2.3) - Math.pow(2.3, 1.2));
});
