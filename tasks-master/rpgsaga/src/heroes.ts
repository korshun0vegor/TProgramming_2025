export type HeroType = "knight" | "archer" | "mage";
export type EffectType = "fire" | "ice";

type Effect = {
  type: EffectType;
  damage: number;
  turns: number;
};

function getEffectName(effect: EffectType) {
  if (effect === "fire") {
    return "огня";
  }

  return "льда";
}

export abstract class Hero {
  protected health: number;
  protected strength: number;
  protected effects: Effect[] = [];
  private skipNextTurn = false;
  private iceArrowsLeft: number;
  private maxIceArrows: number;

  constructor(
    protected name: string,
    health: number,
    strength: number,
    iceArrowsLeft = 1,
  ) {
    this.health = health;
    this.strength = strength;
    this.iceArrowsLeft = iceArrowsLeft;
    this.maxIceArrows = iceArrowsLeft;
  }

  abstract get type(): string;

  getName() {
    return this.name;
  }

  getHealth() {
    return this.health;
  }

  isAlive() {
    return this.health > 0;
  }

  takeDamage(damage: number) {
    this.health -= damage;

    if (this.health < 0) {
      this.health = 0;
    }
  }

  startTurn() {
    const logs: string[] = [];

    for (const effect of this.effects) {
      this.takeDamage(effect.damage);
      logs.push(
        `${this.getFullName()} получает ${effect.damage} урона от ${getEffectName(effect.type)}`,
      );
      effect.turns -= 1;
    }

    this.effects = this.effects.filter((effect) => effect.turns > 0);
    return logs;
  }

  attack(enemy: Hero) {
    enemy.takeDamage(this.strength);
    return `${this.getFullName()} наносит ${this.strength} урона противнику ${enemy.getFullName()}`;
  }

  useClassAbility(enemy: Hero) {
    return this.attack(enemy);
  }

  useIceArrows(enemy: Hero) {
    if (this.iceArrowsLeft <= 0) {
      return this.attack(enemy);
    }

    this.iceArrowsLeft -= 1;
    enemy.takeDamage(this.strength);

    if (enemy.canReceiveEffect("ice")) {
      enemy.addEffect({
        type: "ice",
        damage: 2,
        turns: 3,
      });

      return `${this.getFullName()} использует ледяные стрелы против ${enemy.getFullName()}`;
    }

    return `${this.getFullName()} использует ледяные стрелы, но ${enemy.getFullName()} невосприимчив`;
  }

  makeMove(enemy: Hero, random: () => number) {
    const logs = this.startTurn();

    if (!this.isAlive()) {
      logs.push(`${this.getFullName()} погибает`);
      return logs;
    }

    if (this.skipNextTurn) {
      this.skipNextTurn = false;
      logs.push(`${this.getFullName()} пропускает ход`);
      return logs;
    }

    const chance = random();

    if (chance < 0.25) {
      logs.push(this.useClassAbility(enemy));
    } else if (chance < 0.45 && this.iceArrowsLeft > 0) {
      logs.push(this.useIceArrows(enemy));
    } else {
      logs.push(this.attack(enemy));
    }

    if (!enemy.isAlive()) {
      logs.push(`${enemy.getFullName()} погибает`);
    }

    return logs;
  }

  getFullName() {
    return `(${this.type}) ${this.name}`;
  }

  setSkipNextTurn() {
    this.skipNextTurn = true;
  }

  resetBeforeFight() {
    this.effects = [];
    this.skipNextTurn = false;
    this.iceArrowsLeft = this.maxIceArrows;
  }

  addEffect(effect: Effect) {
    this.effects.push(effect);
  }

  canReceiveEffect(effect: EffectType) {
    return effect === "fire" || effect === "ice";
  }
}

export class Knight extends Hero {
  get type() {
    return "Рыцарь";
  }

  override useClassAbility(enemy: Hero) {
    const damage = Math.round(this.strength * 1.3);
    enemy.takeDamage(damage);
    return `${this.getFullName()} использует удар возмездия и наносит ${damage} урона противнику ${enemy.getFullName()}`;
  }
}

export class Archer extends Hero {
  private fireUsed = false;

  constructor(name: string, health: number, strength: number) {
    super(name, health, strength, 2);
  }

  get type() {
    return "Лучник";
  }

  override useClassAbility(enemy: Hero) {
    if (this.fireUsed) {
      return this.attack(enemy);
    }

    this.fireUsed = true;

    if (enemy.canReceiveEffect("fire")) {
      enemy.addEffect({
        type: "fire",
        damage: 2,
        turns: 100,
      });
    }

    return `${this.getFullName()} использует огненные стрелы против ${enemy.getFullName()}`;
  }

  override resetBeforeFight() {
    super.resetBeforeFight();
    this.fireUsed = false;
  }
}

export class Mage extends Hero {
  get type() {
    return "Маг";
  }

  override useClassAbility(enemy: Hero) {
    enemy.setSkipNextTurn();
    return `${this.getFullName()} использует заворожение, ${enemy.getFullName()} пропустит ход`;
  }

  override canReceiveEffect(effect: EffectType) {
    return effect !== "ice";
  }
}
