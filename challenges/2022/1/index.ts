import getInput from "../../../utils/getInput";

const parseInput = (input: string): number[][] => {
  const elves = input.split("\n\n");
  return elves.map((i) => i.split("\n").map(Number));
};

const part1 = () => {
  const parsedInput = parseInput(getInput("2022", "1"));
  const sums = parsedInput.map((i) => i.reduce((a, c) => a + c));
  return Math.max(...sums);
};

const part2 = () => {
  const parsedInput = parseInput(getInput("2022", "1"));
  const sums = parsedInput.map((i) => i.reduce((a, c) => a + c));
  const sorted = sums.sort((a, b) => b - a);
  return sorted[0] + sorted[1] + sorted[2];
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
