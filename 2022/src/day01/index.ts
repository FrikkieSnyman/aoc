import run from "aocrunner";

const parseInput = (input: string): number[][] => {
  const elves = input.split("\n\n");
  return elves.map((i) => i.split("\n").map(Number));
};

const part1 = (rawInput: string) => {
  const parsedInput = parseInput(rawInput);
  const sums = parsedInput.map((i) => i.reduce((a, c) => a + c));
  return Math.max(...sums);
};

const part2 = (rawInput: string) => {
  const parsedInput = parseInput(rawInput);
  const sums = parsedInput.map((i) => i.reduce((a, c) => a + c));
  const sorted = sums.sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
