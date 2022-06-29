const newCell = () => ({ player: "", army: [] });

const initBoard = ({ size }) =>
  Array(size)
    .fill()
    .map(() => Array(size).fill(newCell()));

const updateBoardPos = (board, { pos, fn }) =>
  board.map((v, i) =>
    i === pos.x ? v.map((v, i) => (i === pos.y ? fn(v) : v)) : v
  );

export { initBoard, updateBoardPos };
