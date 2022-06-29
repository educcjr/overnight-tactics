import { v4 as uuid } from "uuid";
import { Position, Squad, TrainingSquad } from "./types";

const deployTrainedTroop = (pos: Position) =>
  ({ type, soldiers, id }: TrainingSquad): Squad => ({
    id: id || uuid(),
    type,
    soldiers,
    pos,
    nextPos: undefined,
  });

export { deployTrainedTroop };
