import getInput from "../../../utils/getInput";
import * as _ from "lodash";
const input = (): number[] => {
  const i = getInput("2021", "7");
  return i.split(",").map(Number);
};

const part1 = () => {
  const i = input();
  const [min, max] = [Math.min(...i), Math.max(...i)];
  let [bestPos, lowestTotalDist] = [undefined, undefined] as [
    number | undefined,
    number | undefined
  ];

  for (let pos = min; pos <= max; ++pos) {
    let totalDist = 0;
    i.forEach((c) => {
      totalDist += Math.abs(c - pos);
    });
    if (!lowestTotalDist || totalDist < lowestTotalDist) {
      lowestTotalDist = totalDist;
      bestPos = pos;
    }
  }

  return lowestTotalDist;
};

const part2 = () => {
  const i = input();
  const [min, max] = [Math.min(...i), Math.max(...i)];
  let [bestPos, lowestTotalDist] = [undefined, undefined] as [
    number | undefined,
    number | undefined
  ];

  for (let pos = min; pos <= max; ++pos) {
    let totalDist = 0;
    i.forEach((c) => {
      // triangular number
      const n = Math.abs(c - pos);
      totalDist += (Math.pow(n, 2) + n) / 2;
    });
    if (!lowestTotalDist || totalDist < lowestTotalDist) {
      lowestTotalDist = totalDist;
      bestPos = pos;
    }
  }

  return lowestTotalDist;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
