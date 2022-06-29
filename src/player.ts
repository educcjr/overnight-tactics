import { Camp, Player, PlayerInput, Position } from "./types.js";

const newCamp = ({ id, pos }: { id: string, pos: Position }): Camp => ({
  id,
  pos,
  population: 0,
  training: [],
});

const newPlayer = ({ id, name, pos, campId }: PlayerInput): Player => ({
  camps: [newCamp({ id: campId, pos })],
  id,
  name,
  gold: 0,
  army: [],
});

export { newPlayer };
