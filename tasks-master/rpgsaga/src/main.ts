import { Game } from "./game.js";
import { HeroFactory } from "./heroFactory.js";
import { Logger } from "./logger.js";

const logger = new Logger();
const heroes = HeroFactory.createRandomHeroes(2);
const game = new Game(heroes, logger);

game.play();
