import { Game } from "./types.js";

let game: Game = { players: [], board: [[]], step: 0 };

const gameState = (): Game => ({ ...game });
const setGame = (f: (g: Game) => Partial<Game>): void => { game = { ...game, ...f({ ...game }) } };

export { gameState, setGame };
