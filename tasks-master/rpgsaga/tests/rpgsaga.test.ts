import { describe, expect, it } from "vitest";

import { Game, HeroFactory, Knight, Logger, Mage } from "../src/index.js";

describe("RPG Saga", () => {
  it("фабрика создает рыцаря", () => {
    const hero = HeroFactory.createHero("knight", "Артур", 100, 10);

    expect(hero).toBeInstanceOf(Knight);
    expect(hero.getName()).toBe("Артур");
    expect(hero.getHealth()).toBe(100);
  });

  it("способность рыцаря дает дополнительный урон", () => {
    const knight = HeroFactory.createHero("knight", "Артур", 100, 10);
    const mage = HeroFactory.createHero("mage", "Мерлин", 100, 10);

    knight.useClassAbility(mage);

    expect(mage.getHealth()).toBe(87);
  });

  it("маг не получает эффект льда", () => {
    const archer = HeroFactory.createHero("archer", "Эльдар", 100, 10);
    const mage = HeroFactory.createHero("mage", "Гэндальф", 100, 10);

    archer.useIceArrows(mage);
    mage.startTurn();

    expect(mage.getHealth()).toBe(90);
    expect(mage).toBeInstanceOf(Mage);
  });

  it("эффект ледяных стрел может складываться", () => {
    const archer = HeroFactory.createHero("archer", "Эльдар", 100, 10);
    const knight = HeroFactory.createHero("knight", "Артур", 100, 10);

    archer.useIceArrows(knight);
    archer.useIceArrows(knight);
    knight.startTurn();

    expect(knight.getHealth()).toBe(76);
  });

  it("игра возвращает одного победителя", () => {
    const logger = new Logger(false);
    const heroes = [
      HeroFactory.createHero("knight", "Артур", 40, 15),
      HeroFactory.createHero("mage", "Гэндальф", 30, 10),
    ];
    const game = new Game(heroes, logger, () => 0.9);

    const winner = game.play();

    expect(winner.isAlive()).toBe(true);
    expect(logger.getLogs().some((line) => line.includes("Победитель"))).toBe(true);
  });
});
