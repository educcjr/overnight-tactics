import { v4 as uuid } from "uuid";
import { newBoard, playerArmyToBoard, playerCampsToBoard, refreshBoard } from "./board.js";
import {
  POPULATION_GROWTH,
  POPULATION_PRODUCTION,
  SQUAD_GOLD_COST,
  SQUAD_POPULATION_COST,
  SQUAD_SOLDIERS,
  SQUAD_TRAINING_STEPS
} from "./constants.js";
import { updateListById } from "./helpers.js";
import { newPlayer } from "./player.js";
import { BoardCellUpdate, Game, Player, PlayerInput, Position, Squad } from "./types.js";

// Starts a new game.
const newGame = ({ boardSize }: { boardSize: number }): Game => ({
  board: newBoard({ size: boardSize }),
  players: [],
  step: 0,
});

// Adds new player to `players` list the to the `board` as well.
const addPlayer = ({ board, players }: Game, playerInput: PlayerInput): Partial<Game> => ({
  players: [...players, newPlayer(playerInput)],
});

// Next game step.
// - Increases players `population` and `gold`.
// - Decreases training squads `remainingSteps`.
// - Completes squad training by removing it and adding a new squad to the player's `army`.
// - Moves squads.
// - Renders a new `game#board`.
// - Increases `game#step`
const nextStep = ({ step, players, board }: Game): Partial<Game> => {
  const updatedPlayers: Player[] = players.map(
    ({ camps, gold, army, ...player }) => ({
      ...player,
      gold: gold + camps.reduce((acc, curr) => acc + curr.population, 0) * POPULATION_PRODUCTION,
      camps: camps.map((c) => ({
        ...c,
        population: c.population + POPULATION_GROWTH,
        training: c.training
          .map((t) => ({
            ...t,
            remainingSteps: t.remainingSteps - 1,
          }))
          .filter((t) => t.remainingSteps > 0)
      })),
      army: [
        ...army.map((a): Squad =>
          a.nextPos ? { ...a, pos: a.nextPos, nextPos: undefined } : a
        ),
        ...camps.map((c) =>
          c.training
            .filter(t => t.remainingSteps === 1)
            .map(({ type, soldiers, id }): Squad => ({
              id: id || uuid(),
              type,
              soldiers,
              pos: c.pos,
              nextPos: undefined,
            }))
        ).flat(),
      ],
    })
  );

  return {
    step: step + 1,
    board: refreshBoard(board.length, [
      ...updatedPlayers.map(playerCampsToBoard).flat(),
      ...updatedPlayers.map(playerArmyToBoard).flat(),
    ]),
    players: updatedPlayers,
  };
};

const consumeRes = (res: number, cost: number) => {
  if (res - cost < 0) {
    throw "Unavailable resources.";
  }
  return res - cost;
};

// Starts a squad traning. Training progress and completition happens on `nextStep` action.
const trainSquad = ({ players }: Game, { playerId, campId, id }: { playerId: string, campId: string, id: string }): Partial<Game> => ({
  players: updateListById(players, playerId, ({ camps, gold }) => ({
    camps: updateListById(camps, campId, ({ training, population }) => ({
      population: consumeRes(population, SQUAD_POPULATION_COST),
      training: [
        ...training,
        {
          id: id,
          type: "squad",
          soldiers: SQUAD_SOLDIERS,
          remainingSteps: SQUAD_TRAINING_STEPS,
        },
      ],
    })),
    gold: consumeRes(gold, SQUAD_GOLD_COST),
  })
  ),
});

// Moves a squad. The squad is actually moved on `nextStep` action.
const moveSquad = ({ players }: Game, { playerId, squadId, dir }: { playerId: string, squadId: string, dir: Position }): Partial<Game> => ({
  players: updateListById(players, playerId, ({ army }) => ({
    army: updateListById(army, squadId, ({ pos, ...squad }) => ({
      ...squad,
      nextPos: { x: pos.x + dir.x, y: pos.y + dir.y },
    })),
  })),
});

export { newGame, addPlayer, nextStep, trainSquad, moveSquad };
