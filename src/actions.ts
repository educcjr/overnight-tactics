import { newBoard, playerArmyToBoard, playerCampsToBoard, refreshBoard } from "./board.js";
import {
  POPULATION_GROWTH,
  POPULATION_PRODUCTION,
  SQUAD_GOLD_COST,
  SQUAD_POPULATION_COST,
  SQUAD_SOLDIERS,
  SQUAD_TRAINING_STEPS
} from "./constants.js";
import { consumeResource, updateListById } from "./helpers.js";
import { newPlayer } from "./player.js";
import { deployTrainedTroop } from "./troop.js";
import { Game, Player, PlayerInput, Position } from "./types.js";

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
  const goldStep = ({ camps, gold, ...player }: Player): Player => ({
    ...player,
    camps,
    gold: gold + camps.reduce((acc, curr) => acc + curr.population, 0) * POPULATION_PRODUCTION
  });

  const populationStep = ({ camps, ...player }: Player): Player => ({
    ...player,
    camps: camps.map(({ population, ...camp }) => ({
      ...camp,
      population: population + POPULATION_GROWTH,
    }))
  });

  const trainingArmyStep = ({ camps, army, ...player }: Player): Player => ({
    ...player,
    camps: camps.map(({ training, ...camp }) => ({
      ...camp,
      training: training
        .map(({ remainingSteps, ...trainingTroop }) => ({
          ...trainingTroop,
          remainingSteps: remainingSteps - 1,
        }))
        .filter(({ remainingSteps }) => remainingSteps > 0)
    })),
    army: [
      ...army,
      ...camps.map(({ training, pos }) =>
        training
          .filter(({ remainingSteps }) => remainingSteps === 1)
          .map(deployTrainedTroop(pos))
      ).flat()
    ],
  });

  const moveArmyStep = ({ army, ...player }: Player) => ({
    ...player,
    army: army.map((troop) =>
      troop.nextPos
        ? { ...troop, pos: troop.nextPos, nextPos: undefined }
        : troop
    ),
  });

  const updatedPlayers = players
    .map(goldStep)
    .map(populationStep)
    .map(trainingArmyStep)
    .map(moveArmyStep);

  return {
    step: step + 1,
    board: refreshBoard(board.length, [
      ...updatedPlayers.map(playerCampsToBoard).flat(),
      ...updatedPlayers.map(playerArmyToBoard).flat(),
    ]),
    players: updatedPlayers,
  };
};

// Starts a squad training. Training progress and completition happens on `nextStep` action.
const trainSquad = ({ players }: Game, { playerId, campId, id }: { playerId: string, campId: string, id: string }): Partial<Game> => ({
  players: updateListById(players, playerId, ({ camps, gold }) => ({
    camps: updateListById(camps, campId, ({ training, population }) => ({
      population: consumeResource(population, SQUAD_POPULATION_COST),
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
    gold: consumeResource(gold, SQUAD_GOLD_COST),
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
