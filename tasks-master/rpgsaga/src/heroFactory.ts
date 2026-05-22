import { Archer, Hero, Knight, Mage } from "./heroes.js";
import type { HeroType } from "./heroes.js";

const names = ["Артур", "Эльдар", "Гэндальф", "Вильямс", "Роланд", "Леголас", "Мерлин", "Тристан"];

const heroTypes: HeroType[] = ["knight", "archer", "mage"];

function randomNumber(min: number, max: number, random: () => number) {
  return min + Math.floor(random() * (max - min + 1));
}

export class HeroFactory {
  static createHero(type: HeroType, name: string, health: number, strength: number): Hero {
    if (type === "knight") {
      return new Knight(name, health, strength);
    }

    if (type === "archer") {
      return new Archer(name, health, strength);
    }

    return new Mage(name, health, strength);
  }

  static createRandomHeroes(count: number, random: () => number = Math.random) {
    const heroes: Hero[] = [];

    for (let i = 0; i < count; i += 1) {
      const type = heroTypes[Math.floor(random() * heroTypes.length)];
      const name = `${names[Math.floor(random() * names.length)]} ${i + 1}`;
      const health = randomNumber(80, 120, random);
      const strength = randomNumber(10, 20, random);

      heroes.push(this.createHero(type, name, health, strength));
    }

    return heroes;
  }
}
