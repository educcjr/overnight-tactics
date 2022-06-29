import { addPlayer, newGame, nextStep, trainSquad } from "./actions.js";
import { gameState, setGame } from "./game.js";
import { printGame } from "./print.js";

const nextStepN = (t) =>
  Array(t)
    .fill()
    .forEach(() => setGame((g) => nextStep(g)));

// ========== SIMULATION ==========

setGame(() => newGame({ boardSize: 10 }));
printGame(gameState());

setGame((g) => addPlayer(g, { x: 2, y: 2, name: "Duu", id: "dudu" }));
printGame(gameState());

nextStepN(10);
printGame(gameState());

setGame((g) => trainSquad(g, { playerId: "dudu" }));
printGame(gameState());

nextStepN(4);
printGame(gameState());

nextStepN(1);
printGame(gameState());

nextStepN(1);
