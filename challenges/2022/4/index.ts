import getInput from "../../../utils/getInput";
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

const part1 = () => {
  const elfPairs = parseInput(getInput("2022", "4"));
  return elfPairs.reduce(
    (acc, curr) => (checkPairContained(curr) ? acc + 1 : acc),
    0
  );
};
const overlap = (a: Elf, b: Elf): boolean =>
  (a.min >= b.min && a.min <= b.max) || (a.max <= b.max && a.max >= b.min);
const checkPairOverlap = (elfPair: ElfPair): boolean =>
  overlap(elfPair[0], elfPair[1]) || overlap(elfPair[1], elfPair[0]);

const part2 = () => {
  const elfPairs = parseInput(getInput("2022", "4"));
  return elfPairs.reduce(
    (acc, curr) => (checkPairOverlap(curr) ? acc + 1 : acc),
    0
  );
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
