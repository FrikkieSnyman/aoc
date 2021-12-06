import getInput from "../../../utils/getInput";

type FishMap = { [key in number]: number };
const input = (): FishMap => {
  const fish = getInput("2021", "6").split(",").map(Number);
  const ret: FishMap = {};
  fish.forEach((f) => {
    if (!ret[f]) {
      ret[f] = 1;
    } else {
      ret[f]++;
    }
  });
  return ret;
};

const addFishToIndex = (fishMap: FishMap, index: number, count: number) => {
  if (!fishMap[index]) {
    fishMap[index] = count;
  } else {
    fishMap[index] += count;
  }
};

const dayCycle = (fishMap: FishMap): FishMap => {
  const ret: FishMap = {};
  for (const key in fishMap) {
    const k = +key;
    if (k === 0) {
      addFishToIndex(ret, 8, fishMap[k]);
      addFishToIndex(ret, 6, fishMap[k]);
    } else {
      addFishToIndex(ret, k - 1, fishMap[k]);
    }
  }
  return ret;
};

const cycle = (days: number) => {
  let fish = input();
  for (let i = 0; i < days; ++i) {
    fish = dayCycle(fish);
  }

  let sum = 0;
  for (const key in fish) {
    sum += fish[key];
  }
  return sum;
};

const part1 = () => {
  return cycle(18);
};

const part2 = () => {
  return cycle(256);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
