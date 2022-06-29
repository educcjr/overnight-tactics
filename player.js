const newPlayer = ({ x, y, id, name }) => ({
  pos: { x, y },
  id,
  name,
  population: 0,
  gold: 0,
  training: [],
  army: [],
});

const playerToBoard = ({ pos, name, id }) => ({
  pos,
  fn: (p) => ({ ...p, player: { name, id } }),
});

export { newPlayer, playerToBoard };
