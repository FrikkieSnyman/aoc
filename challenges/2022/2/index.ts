import getInput from "../../../utils/getInput";
const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((i) => i.split(" "));

// part 1

// A, X = rock
// B, Y = paper
// C, Z = scissors
export const ResultMap: { [key in string]: { [key in string]: string } } = {
  A: { Y: "W", X: "D", Z: "L" },
  B: { Z: "W", Y: "D", X: "L" },
  C: { X: "W", Z: "D", Y: "L" },
};

export const PlayScore: { [key in string]: number } = {
  X: 1,
  Y: 2,
  Z: 3,
};
export const ResultScore: { [key in string]: number } = {
  L: 0,
  D: 3,
  W: 6,
};

// part 2

export const DesiredOutcome: { [key in string]: string } = {
  X: "L",
  Y: "D",
  Z: "W",
};

export const OutcomeMap: { [key in string]: { [key in string]: string } } = {
  A: { W: "Y", D: "X", L: "Z" },
  B: { W: "Z", D: "Y", L: "X" },
  C: { W: "X", D: "Z", L: "Y" },
};

const part1 = () => {
  const input = parseInput(getInput("2022", "2"));
  let score = 0;
  input.forEach((i: string[]) => {
    score += ResultScore[ResultMap[i[0]][i[1]]] + PlayScore[i[1]];
  });
  return score;
};

const part2 = () => {
  const input = parseInput(getInput("2022", "2"));
  let score = 0;
  input.forEach((i: string[]) => {
    const outcome = DesiredOutcome[i[1]];
    const play = OutcomeMap[i[0]][outcome];
    score += ResultScore[outcome] + PlayScore[play];
  });
  return score;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
