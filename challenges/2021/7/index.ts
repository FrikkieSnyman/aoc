import getInput from "../../../utils/getInput";
import * as _ from "lodash";
const input = (): number[] => {
  const i = getInput("2021", "7");
  return i.split(",").map(Number);
};

const determineLowestCost = (costFn: (p: number) => number) => {
  const i = input();
  const [min, max] = [Math.min(...i), Math.max(...i)];
  let [bestPos, lowestTotalDist] = [undefined, undefined] as [
    number | undefined,
    number | undefined
  ];

  for (let pos = min; pos <= max; ++pos) {
    let totalDist = 0;
    i.forEach((c) => {
      totalDist += costFn(Math.abs(c - pos));
    });
    if (!lowestTotalDist || totalDist < lowestTotalDist) {
      lowestTotalDist = totalDist;
      bestPos = pos;
    }
  }

  return lowestTotalDist;
};

const part1 = () => {
  return determineLowestCost((p) => p);
};

const part2 = () => {
  return determineLowestCost((n) => (Math.pow(n, 2) + n) / 2);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
