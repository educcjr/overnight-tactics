import { table } from "table";

const printCell = ({ player, army }) => {
  let cell = "0";
  if (player !== "") {
    cell = `${player}`;
  }
  if (army.length > 0) {
    cell = `${cell}\n${army.map((a) => `${a.type}: ${a.soldiers}`)}`;
  }
  return cell;
};

const printGame = (g) => {
  g.players.forEach((p) => {
    console.log(
      `${p.name} (${p.id}) | G: ${p.gold} | P: ${p.population} | { x: ${p.pos.x}, y: ${p.pos.y} }`
    );
    console.log(`training ->`, ...p.training);
    console.log(`army ->`, ...p.army);
  });
  console.log(`Step ${g.step}`);
  console.log(
    table(
      g.board.map((c) => c.map(printCell)),
      {
        columns: Array(g.board.length).fill({ alignment: "center" }),
      }
    )
  );
};

export { printGame };
