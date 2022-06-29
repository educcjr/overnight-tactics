import { Board, BoardCell, BoardCellUpdate } from "./types.js";

const newCell = (): BoardCell => ({ player: { name: "", id: 0 }, army: [] });

const newBoard = ({ size }: { size: number }): Board =>
  Array(size)
    .fill(null)
    .map(() => Array(size).fill(newCell()));

const updateBoardPos = (board: Board, { pos, fn }: BoardCellUpdate): Board =>
  board.map((v, i) =>
    i === pos.x ? v.map((v, i) => (i === pos.y ? fn(v) : v)) : v
  );

export { newBoard, updateBoardPos };
