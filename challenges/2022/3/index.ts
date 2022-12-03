import { cluster, unique } from "radash";
import getInput from "../../../utils/getInput";

const parseInput = (input: string): string[][] => {
  return input
    .trim()
    .split("\n")
    .map((i) => {
      const middle = i.length / 2;
      return [i.substring(0, middle), i.substring(middle)];
    });
};

const letterScore = (letter: string) => {
  const value = letter.charCodeAt(0);
  return value > 90 ? value - 96 : value - 64 + 26;
};

const findDupe = (s: string[]): string => {
  const map: Record<string, boolean> = {};
  [...s[0]].forEach((c) => (map[c] = true));
  for (let i = 0; i < s[1].length; ++i) {
    if (map[s[1][i]]) {
      return s[1][i];
    }
  }
  throw new Error("no dupes found");
};

const findCommon = (s: string[][]): string => {
  const map: Record<string, number> = {};
  s.forEach((rucksack) =>
    unique([..."".concat(...rucksack)]).forEach((c) =>
      !map[c] ? (map[c] = 1) : (map[c] += 1)
    )
  );
  for (const key in map) {
    if (map[key] === s.length) {
      return key;
    }
  }
  throw new Error("no dupes found");
};

const part1 = () => {
  const input = parseInput(getInput("2022", "3"));
  return input.reduce<number>(
    (acc, cur) => acc + letterScore(findDupe(cur)),
    0
  );
};

const part2 = () => {
  const input = cluster(parseInput(getInput("2022", "3")), 3);
  return input.reduce<number>(
    (acc, cur) => acc + letterScore(findCommon(cur)),
    0
  );
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
