import { initBoard, updateBoardPos } from "./board.js";
import {
  POPULATION_GROWTH,
  POPULATION_PRODUCTION,
  SQUAD_GOLD_COST,
  SQUAD_POPULATION_COST,
  SQUAD_SOLDIERS,
  SQUAD_TRAINING_STEPS,
} from "./constants.js";
import { newPlayer, playerToBoard, updatePlayer } from "./player.js";

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
        ...army,
        ...training
          .filter((t) => t.remainingSteps === 1)
          .map(({ type, soldiers }) => ({
            type,
            soldiers,
            pos: player.pos,
          })),
      ],
    })
  );

  const updatedBoard = [
    ...updatedPlayers.map(playerToBoard),
    ...updatedPlayers
      .map(({ army }) =>
        army.map(({ type, soldiers, pos }) => ({
          pos,
          fn: (p) => ({ ...p, army: [...p.army, { type, soldiers }] }),
        }))
      )
      .flat(),
  ].reduce((acc, curr) => updateBoardPos(acc, curr), board);

  return {
    step: step + 1,
    board: updatedBoard,
    players: updatedPlayers,
  };
};

const trainSquad = ({ players }, { playerId }) => ({
  players: updatePlayer(
    players,
    playerId,
    ({ training, population, gold }) => ({
      training: [
        ...training,
        {
          type: "squad",
          soldiers: SQUAD_SOLDIERS,
          remainingSteps: SQUAD_TRAINING_STEPS,
        },
      ],
      population: population - SQUAD_POPULATION_COST,
      gold: gold - SQUAD_GOLD_COST,
    })
  ),
});

export { newGame, addPlayer, nextStep, trainSquad };
