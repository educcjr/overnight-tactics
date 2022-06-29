let game = {};

const gameState = () => ({ ...game });
const setGame = (f) => (game = { ...game, ...f({ ...game }) });

export { gameState, setGame };
