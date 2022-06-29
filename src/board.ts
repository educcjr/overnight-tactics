import { Board, BoardCell, BoardCellUpdate, Player } from "./types.js";

const newCell = (): BoardCell => ({ player: { name: "", id: 0 }, camp: [], army: [] });

const newBoard = ({ size }: { size: number }): Board =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(newCell()));

const updateBoardPos = (board: Board, { pos, fn }: BoardCellUpdate): Board =>
  board.map((v, i) =>
    i === pos.x ? v.map((v, i) => (i === pos.y ? fn(v) : v)) : v
  );

const playerCampsToBoard = ({ camps, name, id }: Player): BoardCellUpdate[] =>
  camps.map(({ pos, id: campId }): BoardCellUpdate => ({
    pos,
    fn: (bc) => ({ ...bc, player: { name, id }, camp: { id: campId } }),
  }));

export { newBoard, updateBoardPos, playerCampsToBoard };
