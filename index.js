import {
  addPlayer,
  moveSquad,
  newGame,
  nextStep,
  trainSquad,
} from "./actions.js";
import { gameState, setGame } from "./game.js";
import { printGame } from "./print.js";

const nextStepN = (t) =>
  Array(t)
    .fill()
    .forEach(() => setGame((g) => nextStep(g)));

// ========== SIMULATION ==========

setGame(() => newGame({ boardSize: 10 }));
setGame((g) => addPlayer(g, { x: 2, y: 2, name: "Duu", id: "dudu" }));
setGame((g) => addPlayer(g, { x: 7, y: 7, name: "Foo", id: "foo" }));
printGame(gameState()); // => 2 players on the board

nextStepN(10);
printGame(gameState()); // => sufficient ressources for squads
setGame((g) => trainSquad(g, { playerId: "dudu", id: "1" }));
printGame(gameState()); // => start squad training
nextStepN(5);
printGame(gameState()); // => squad training finished
nextStepN(6);
setGame((g) => trainSquad(g, { playerId: "dudu", id: "2" }));
printGame(gameState()); // => another start squad training

nextStepN(3);
printGame(gameState()); // => next day
setGame((g) =>
  moveSquad(g, { playerId: "dudu", squadId: "1", dir: { x: 1, y: 1 } })
);
printGame(gameState()); // => squad preparing to move
nextStepN(1);
printGame(gameState()); // => squad moved

setGame((g) =>
  moveSquad(g, { playerId: "dudu", squadId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
printGame(gameState()); // => squad moved

setGame((g) =>
  moveSquad(g, { playerId: "dudu", squadId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
printGame(gameState()); // => squad moved

setGame((g) =>
  moveSquad(g, { playerId: "dudu", squadId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
printGame(gameState()); // => squad moved

setGame((g) =>
  moveSquad(g, { playerId: "dudu", squadId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
printGame(gameState()); // => squad moved
