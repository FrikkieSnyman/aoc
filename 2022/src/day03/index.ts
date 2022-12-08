import run from "aocrunner";
import { cluster, unique } from "radash";

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
      !map[c] ? (map[c] = 1) : (map[c] += 1),
    ),
  );
  for (const key in map) {
    if (map[key] === s.length) {
      return key;
    }
  }
  throw new Error("no dupes found");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return input.reduce<number>(
    (acc, cur) => acc + letterScore(findDupe(cur)),
    0,
  );
};

const part2 = (rawInput: string) => {
  const input = cluster(parseInput(rawInput), 3);
  return input.reduce<number>(
    (acc, cur) => acc + letterScore(findCommon(cur)),
    0,
  );
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
