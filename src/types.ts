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

type Camp = {
  id: string;
  pos: Position;
  population: number;
  training: TrainingSquad[];
}

type PlayerInput = {
  pos: Position;
  id: string;
  name: string;
  campId: string;
}

type Player = {
  id: string;
  name: string;
  camps: Camp[],
  gold: number;
  army: Squad[];
}

type BoardCell = {
  player: any;
  camp: any;
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

export { PlayerInput, Player, Camp, Board, BoardCell, BoardCellUpdate, Position, Game, Squad }
