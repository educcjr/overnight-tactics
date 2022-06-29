type Position = { x: number; y: number; }

type TrainingSquad = {
  id: string;
  type: string;
  soldiers: number;
  remainingSteps: number;
}

type Squad = {
  id: string;
  type: string;
  soldiers: number;
  pos: Position;
  nextPos?: Position;
}

type PlayerInput = {
  x: number;
  y: number;
  id: string;
  name: string;
}

type Player = {
  pos: Position;
  name: string;
  id: string;
  population: number;
  gold: number;
  training: TrainingSquad[];
  army: Squad[];
}

type BoardCell = {
  player: any;
  army: any[];
}

type BoardCellUpdate = {
  pos: Position;
  fn: (cell: BoardCell) => BoardCell;
}

type Board = Array<Array<BoardCell>>

type Game = {
  players: Player[];
  board: Board;
  step: number;
}

export { PlayerInput, Player, Board, BoardCell, BoardCellUpdate, Position, Game, Squad }
