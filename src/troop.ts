import { v4 as uuid } from "uuid";
import { Position, Troop, TrainingTroop } from "./types";

const deployTrainedTroop = (pos: Position) =>
  ({ type, soldiers, id }: TrainingTroop): Troop => ({
    id: id || uuid(),
    type,
    soldiers,
    pos,
    nextPos: undefined,
  });

export { deployTrainedTroop };
