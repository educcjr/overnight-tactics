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

const refreshBoard = (boardSize: number, updates: BoardCellUpdate[]) =>
  updates.reduce(
    (acc, curr) => updateBoardPos(acc, curr),
    newBoard({ size: boardSize })
  );

const playerCampsToBoard = ({ camps, name, id }: Player): BoardCellUpdate[] =>
  camps.map(({ pos, id: campId }): BoardCellUpdate => ({
    pos,
    fn: (bc) => ({ ...bc, player: { name, id }, camp: { id: campId } }),
  }));

const playerArmyToBoard = ({ army, id: playerId }: Player): BoardCellUpdate[] =>
  army.map(({ type, soldiers, pos, id }): BoardCellUpdate => ({
    pos,
    fn: (p) => ({
      ...p,
      army: [...p.army, { type, soldiers, id, playerId }],
    }),
  }))

export { newBoard, playerCampsToBoard, playerArmyToBoard, refreshBoard };
