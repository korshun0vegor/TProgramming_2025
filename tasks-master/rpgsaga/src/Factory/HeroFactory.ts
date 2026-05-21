import { Hero } from "../Heroes/Hero";
import { HeroType } from "../Heroes/HeroType";
import { Knight } from "../Heroes/Knight";
import { Mage } from "../Heroes/Mage";
import { Archer } from "../Heroes/Archer";

export class HeroFactory {
    private readonly names: string[] = [
        "Артур",
        "Эльдар",
        "Гэндальф",
        "Вильямс",
        "Роланд",
        "Леголас",
        "Мерлин",
        "Тристан"
    ];

    public createHero(type: HeroType, name: string, health: number, power: number): Hero {
        switch (type) {
            case HeroType.Knight:
                return new Knight(name, health, power);

            case HeroType.Archer:
                return new Archer(name, health, power);

            case HeroType.Mage:
                return new Mage(name, health, power);

            default:
                throw new Error("Неизвестный тип героя");
        }
    }

    public createRandomHeroes(count: number): Hero[] {
        const heroes: Hero[] = [];
        const heroTypes: HeroType[] = [
            HeroType.Knight,
            HeroType.Archer,
            HeroType.Mage
        ];

        for (let i = 0; i < count; i++) {
            const type = heroTypes[Math.floor(Math.random() * heroTypes.length)];
            const name = this.names[Math.floor(Math.random() * this.names.length)] + `_${i + 1}`;
            const health = Math.floor(Math.random() * 51) + 50;
            const power = Math.floor(Math.random() * 16) + 10;

            heroes.push(this.createHero(type, name, health, power));
        }

        return heroes;
    }
}