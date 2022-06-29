import {
  addPlayer,
  moveTroops,
  newGame,
  nextStep,
  trainTroops
} from "./actions.js";
import { gameState, setGame } from "./game.js";
import { printGame } from "./print.js";

const nextStepN = (t: number) =>
  Array(t)
    .fill(null)
    .forEach(() => setGame((g: any) => nextStep(g)));

// ========== SIMULATION ==========

setGame(() => newGame({ boardSize: 10 }));
setGame((g) => addPlayer(g, { pos: { x: 2, y: 2 }, name: "Duu", id: "dudu", campId: '1' }));
setGame((g) => addPlayer(g, { pos: { x: 7, y: 7 }, name: "Foo", id: "foo", campId: '1' }));
printGame(gameState()); // => 2 players added

nextStepN(1);
printGame(gameState()); // => 2 players on the board

nextStepN(9);
printGame(gameState()); // => sufficient ressources for troops

setGame((g) => trainTroops(g, { playerId: "dudu", campId: "1", id: "1" }));
printGame(gameState()); // => start troop training

nextStepN(5);
printGame(gameState()); // => troop training finished

nextStepN(6);
setGame((g) => trainTroops(g, { playerId: "dudu", campId: "1", id: "2" }));
printGame(gameState()); // => another troop training

nextStepN(3);
printGame(gameState()); // => next day

setGame((g) =>
  moveTroops(g, { playerId: "dudu", troopId: "1", dir: { x: 1, y: 1 } })
);
printGame(gameState()); // => troop preparing to move

nextStepN(1);
printGame(gameState()); // => troop moved

setGame((g) =>
  moveTroops(g, { playerId: "dudu", troopId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
setGame((g) =>
  moveTroops(g, { playerId: "dudu", troopId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
setGame((g) =>
  moveTroops(g, { playerId: "dudu", troopId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
setGame((g) =>
  moveTroops(g, { playerId: "dudu", troopId: "1", dir: { x: 1, y: 0 } })
);
nextStepN(1);
printGame(gameState()); // => troop moved
