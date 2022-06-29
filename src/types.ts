type Position = { x: number; y: number; }

type TrainingTroop = {
  id: string;
  type: string;
  soldiers: number;
  remainingSteps: number;
}

type Troop = {
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
  training: TrainingTroop[];
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
  army: Troop[];
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

export { PlayerInput, Player, Camp, Board, BoardCell, BoardCellUpdate, Position, Game, TrainingTroop, Troop }
