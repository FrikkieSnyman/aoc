import getInput from "../../../utils/getInput";

const firstMarkerPosition = (stream: string, count: number): number => {
  let index = count - 1;
  let c = stream[index];
  while (c) {
    const set = new Set();
    for (let i = 0; i < count; i++) {
      set.add(stream[index - i]);
    }
    if (set.size === count) {
      return index;
    }
    c = stream[index++];
  }
  throw new Error("no marker found");
};

const part1 = () => {
  return firstMarkerPosition(getInput("2022", "6"), 4) + 1;
};

const part2 = () => {
  return firstMarkerPosition(getInput("2022", "6"), 14) + 1;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
