import getInput from "../../../utils/getInput";

const parseInput = (input: string): number[][] => {
  return input
    .trim()
    .split("\n")
    .map((l) => l.split("").map((i) => parseInt(i)));
};
const getCol = (arr: number[][], index: number): number[] => {
  return arr.reduce((acc, curr) => {
    acc.push(curr[index]);
    return acc;
  }, [] as number[]);
};

const isTallest = (height: number, trees: number[]): boolean =>
  trees.every((t) => t < height);

const splitArr = (index: number, arr: number[]): number[][] => [
  arr.slice(index + 1),
  arr.slice(0, index)
];

const part1 = () => {
  const grid = parseInput(getInput("2022", "8"));
  const width = grid[0].length;
  const height = grid.length;
  let visibleCount = width * 2 + height * 2 - 4;
  for (let y = 1; y < height - 1; y++) {
    const row = grid[y];
    // oh no O(n^2) panic
    for (let x = 1; x < width - 1; x++) {
      const col = getCol(grid, x);
      const currHeight = row[x];
      const visibleFromSide = splitArr(x, row).some((trees) =>
        isTallest(currHeight, trees)
      );
      const visibleFromVer = splitArr(y, col).some((trees) =>
        isTallest(currHeight, trees)
      );
      if (visibleFromSide || visibleFromVer) {
        visibleCount++;
      }
    }
  }
  return visibleCount;
};

const viewCount = (
  currTreeHeight: number,
  arrOfTreesFromTreeToEdge: number[]
): number => {
  let count = 1;
  for (const tree of arrOfTreesFromTreeToEdge) {
    if (tree < currTreeHeight) {
      count++;
      continue;
    }
    return count;
  }
  // this means it's taller than all trees, so subtract 1 to account for edges
  return count - 1;
};

const part2 = () => {
  const grid = parseInput(getInput("2022", "8"));
  const width = grid[0].length;
  const height = grid.length;
  const scores = [];
  for (let y = 1; y < height - 1; y++) {
    const row = grid[y];
    // oh no O(n^2) panic
    for (let x = 1; x < width - 1; x++) {
      const col = getCol(grid, x);
      const currHeight = row[x];
      let score = 1;
      [...splitArr(x, row), ...splitArr(y, col)].forEach((trees, index) => {
        score *= viewCount(
          currHeight,
          index % 2 === 0 ? trees : trees.reverse()
        );
      });
      scores.push(score);
    }
  }
  return Math.max(...scores);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
