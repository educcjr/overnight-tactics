import { BoardCellUpdate, Player, PlayerInput } from "./types.js";

const newPlayer = ({ x, y, id, name }: PlayerInput): Player => ({
  pos: { x, y },
  id,
  name,
  population: 0,
  gold: 0,
  training: [],
  army: [],
});

const playerToBoard = ({ pos, name, id }: Player): BoardCellUpdate => ({
  pos,
  fn: (p) => ({ ...p, player: { name, id } }),
});

export { newPlayer, playerToBoard };