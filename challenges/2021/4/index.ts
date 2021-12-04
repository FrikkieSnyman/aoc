import getInput from "../../../utils/getInput";
type Element = { x: number; y: number; drawn: boolean; value: number };
type Board = Array<Element>;

const input = () => {
  const i = getInput("2021", "4").split("\n\n");
  const draws = i[0].split(",").map(Number);
  i.splice(0, 1);
  let boards: Board[] = [];

  for (const b of i) {
    const board: Board = [];
    const rows = b.split("\n");
    for (let y = 0; y < rows.length; ++y) {
      const cols = rows[y].split(" ").filter((c) => !!c);
      for (let x = 0; x < cols.length; ++x) {
        const key = Number(cols[x]);
        if (board[key]) {
          throw new Error("key already exists!" + key);
        }
        board[key] = { drawn: false, x, y, value: key };
      }
    }
    boards.push(board);
  }

  return { draws, boards };
};

const checkWin = (draw: number, rowCol: Element[], board: Board) => {
  if (rowCol.every((r) => r.drawn)) {
    const undrawn = board.filter((n) => !n.drawn);
    return draw * undrawn.map((u) => u.value).reduce((val, curr) => val + curr);
  }
  return false;
};

const part1 = () => {
  const game = input();
  for (const draw of game.draws) {
    for (const b of game.boards) {
      if (b[draw]) {
        b[draw].drawn = true;

        for (let i = 0; i < 5; ++i) {
          const rows = b.filter((n) => n.y === i);
          const rr = checkWin(draw, rows, b);
          if (rr) {
            return rr;
          }
          const cols = b.filter((n) => n.x === i);
          const rc = checkWin(draw, cols, b);
          if (rc) {
            return rc;
          }
        }
      }
    }
  }
};

const part2 = () => {
  const game = input();
  let lastWin: { board: Board; score: number } | undefined;
  for (const draw of game.draws) {
    for (let bc = 0; bc < game.boards.length; bc++) {
      const b = game.boards[bc];

      if (b[draw]) {
        b[draw].drawn = true;

        for (let i = 0; i < 5; ++i) {
          const rows = b.filter((n) => n.y === i);
          const cols = b.filter((n) => n.x === i);
          const rr = checkWin(draw, rows, b);
          const rc = checkWin(draw, cols, b);
          if (rr) {
            lastWin = { board: b, score: rr };
            game.boards.splice(bc, 1);
            bc--;
          }

          if (rc) {
            lastWin = { board: b, score: rc };
            game.boards.splice(bc, 1);
            bc--;
          }
        }
      }
    }
  }
  return lastWin?.score;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
