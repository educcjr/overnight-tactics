import { table } from "table";
import { BoardCell, Game } from "./types";

const printCell = ({ player, army }: BoardCell) => {
  let cell = "";
  if (player.name !== "") {
    cell = `${player.name}`;
  }
  if (army.length > 0) {
    cell = `${cell}\n${army.reduce(
      (acc, curr) => `${acc}${curr.type}#${curr.id}\n`,
      ""
    )}`;
  }
  return cell.length > 0 ? cell.trim() : "-";
};

const printGame = (g: Game) => {
  g.players.forEach((p) => {
    console.log(
      `${p.name} (${p.id}) | G: ${p.gold} | P: ${p.population} | { x: ${p.pos.x}, y: ${p.pos.y} }`
    );
    console.log(`training ->`, ...p.training);
    console.log(
      `army -> ${p.army.map(
        (s) =>
          `${s.type}#${s.id}(${s.soldiers})[${s.pos.x},${s.pos.y}]${s.nextPos ? `->[${s.nextPos.x},${s.nextPos.y}]` : ""
          }`
      )}`
    );
  });
  console.log(`Step ${g.step % 24} (Day ${Math.floor(g.step / 24) + 1})`);
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
