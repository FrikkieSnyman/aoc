import getInput from "../../../utils/getInput";

const part1 = () => {
  const input = getInput("2021", "1");
  const depths = input.split("\n").map(Number);
  let count = 0;
  for (let i = 1; i < depths.length; ++i) {
    if (depths[i] > depths[i - 1]) {
      count++;
    }
  }

  return count;
};

const part2 = () => {
  const input = getInput("2021", "1");
  const depths = input.split("\n").map(Number);

  const windowSums = [];
  for (let i = 0; i < depths.length; ++i) {
    const [a, b, c] = [depths[i], depths[i + 1], depths[i + 2]];
    if (a === undefined || b === undefined || c === undefined) {
      break;
    }
    windowSums.push(a + b + c);
  }
  let count = 0;
  for (let i = 1; i < windowSums.length; ++i) {
    if (windowSums[i] > windowSums[i - 1]) {
      count++;
    }
  }
  return count;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
