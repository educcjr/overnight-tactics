import { v4 as uuid } from "uuid";
import { initBoard, updateBoardPos } from "./board.js";
import {
  POPULATION_GROWTH,
  POPULATION_PRODUCTION,
  SQUAD_GOLD_COST,
  SQUAD_POPULATION_COST,
  SQUAD_SOLDIERS,
  SQUAD_TRAINING_STEPS,
} from "./constants.js";
import { newPlayer, playerToBoard } from "./player.js";
import { updateListById } from "./helpers.js";

const newGame = ({ boardSize }) => ({
  board: initBoard({ size: boardSize }),
  players: [],
  step: 0,
});

const addPlayer = ({ board, players }, player) => ({
  board: updateBoardPos(board, playerToBoard(newPlayer(player))),
  players: [...players, newPlayer(player)],
});

const nextStep = ({ step, players, board }) => {
  const updatedPlayers = players.map(
    ({ population, gold, training, army, ...player }) => ({
      ...player,
      population: population + POPULATION_GROWTH,
      gold: gold + population * POPULATION_PRODUCTION,
      training: training
        .map((t) => ({
          ...t,
          remainingSteps: t.remainingSteps - 1,
        }))
        .filter((t) => t.remainingSteps > 0),
      army: [
        ...army.map((a) =>
          a.nextPos ? { ...a, pos: a.nextPos, nextPos: null } : a
        ),
        ...training
          .filter((t) => t.remainingSteps === 1)
          .map(({ type, soldiers, id }) => ({
            id: id || uuid(),
            type,
            soldiers,
            pos: player.pos,
            nextPos: null,
          })),
      ],
    })
  );

  const updatedBoard = [
    ...updatedPlayers.map(playerToBoard),
    ...updatedPlayers
      .map(({ army, id: playerId }) =>
        army.map(({ type, soldiers, pos, id }) => ({
          pos,
          fn: (p) => ({
            ...p,
            army: [...p.army, { type, soldiers, id, playerId }],
          }),
        }))
      )
      .flat(),
  ].reduce(
    (acc, curr) => updateBoardPos(acc, curr),
    initBoard({ size: board.length })
  );

  return {
    step: step + 1,
    board: updatedBoard,
    players: updatedPlayers,
  };
};

const consumeRes = (res, cost) => {
  if (res - cost < 0) {
    throw "Unavailable resources.";
  }
  return res - cost;
};

const trainSquad = ({ players }, { playerId, id }) => ({
  players: updateListById(
    players,
    playerId,
    ({ training, population, gold }) => ({
      training: [
        ...training,
        {
          id: id,
          type: "squad",
          soldiers: SQUAD_SOLDIERS,
          remainingSteps: SQUAD_TRAINING_STEPS,
        },
      ],
      population: consumeRes(population, SQUAD_POPULATION_COST),
      gold: consumeRes(gold, SQUAD_GOLD_COST),
    })
  ),
});

const moveSquad = ({ players }, { playerId, squadId, dir }) => ({
  players: updateListById(players, playerId, ({ army }) => ({
    army: updateListById(army, squadId, ({ pos, ...squad }) => ({
      ...squad,
      nextPos: { x: pos.x + dir.x, y: pos.y + dir.y },
    })),
  })),
});

export { newGame, addPlayer, nextStep, trainSquad, moveSquad };
