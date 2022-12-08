import run from "aocrunner";
const firstMarkerPosition = (stream: string, count: number): number => {
  let index = count - 1;
  let c = stream[index];
  while (c) {
    const set = new Set();
    for (let i = 0; i < count; i++) {
      set.add(stream[index - i]);
      if (set.size < i + 1) {
        index += i;
        break;
      }
    }
    if (set.size === count) {
      return index;
    }
    c = stream[index];
  }
  throw new Error("no marker found");
};

const part1 = (rawInput: string) => {
  return firstMarkerPosition(rawInput, 4) + 1;
};

const part2 = (rawInput: string) => {
  return firstMarkerPosition(rawInput, 14) + 1;
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
