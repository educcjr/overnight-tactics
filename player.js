const newPlayer = ({ x, y, id, name }) => ({
  pos: { x, y },
  id,
  name,
  population: 0,
  gold: 0,
  training: [],
  army: [],
});

const playerToBoard = ({ pos, name }) => ({
  pos,
  fn: (p) => ({ ...p, player: name }),
});

const updatePlayer = (players, playerId, updateFn) => {
  const filteredPlayers = players.filter(({ id }) => id === playerId);

  if (filteredPlayers.length > 1) {
    throw "Two players with the same id.";
  }
  if (filteredPlayers.length === 0) {
    throw "Player not found.";
  }

  const player = filteredPlayers[0];
  return [
    ...players.filter(({ id }) => id !== playerId),
    { ...player, ...updateFn(player) },
  ];
};

export { newPlayer, playerToBoard, updatePlayer };
