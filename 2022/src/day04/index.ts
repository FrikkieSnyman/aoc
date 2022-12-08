import run from "aocrunner";

type Elf = {
  min: number;
  max: number;
};
type ElfPair = Elf[];

const parseInput = (input: string): ElfPair[] => {
  return input
    .trim()
    .split("\n")
    .map((ep) => {
      const elfPair: ElfPair = ep.split(",").map((e) => {
        const mm = e.split("-");
        return { min: parseInt(mm[0]), max: parseInt(mm[1]) };
      });
      return elfPair;
    });
};

const contained = (a: Elf, b: Elf): boolean => a.min >= b.min && a.max <= b.max;

const checkPairContained = (elfPair: ElfPair): boolean =>
  contained(elfPair[0], elfPair[1]) || contained(elfPair[1], elfPair[0]);

const part1 = (rawInput: string) => {
  const elfPairs = parseInput(rawInput);
  return elfPairs.reduce(
    (acc, curr) => (checkPairContained(curr) ? acc + 1 : acc),
    0,
  );
};
const overlap = (a: Elf, b: Elf): boolean =>
  (a.min >= b.min && a.min <= b.max) || (a.max <= b.max && a.max >= b.min);
const checkPairOverlap = (elfPair: ElfPair): boolean =>
  overlap(elfPair[0], elfPair[1]) || overlap(elfPair[1], elfPair[0]);

const part2 = (rawInput: string) => {
  const elfPairs = parseInput(rawInput);
  return elfPairs.reduce(
    (acc, curr) => (checkPairOverlap(curr) ? acc + 1 : acc),
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
