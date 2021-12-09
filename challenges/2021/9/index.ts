import { sum } from "lodash";
import getInput from "../../../utils/getInput";

const input = (): number[][] => {
  return getInput("2021", "9", false)
    .split("\n")
    .map((r) => r.split("").map(Number));
};

const checkLower = (el: number, compareTo: number | undefined) => {
  if (compareTo === undefined) {
    return true;
  }
  return el < compareTo;
};

const part1 = () => {
  const lowPointsRisk: number[] = [];
  const map = input();
  for (let j = 0; j < map.length; ++j) {
    const row = map[j];
    for (let i = 0; i < row.length; ++i) {
      const el = row[i];
      const adj = [
        row[i - 1],
        row[i + 1],
        map[j - 1] ? map[j - 1][i] : undefined,
        map[j + 1] ? map[j + 1][i] : undefined,
      ];
      if (adj.every((a) => checkLower(el, a))) {
        lowPointsRisk.push(el + 1);
      }
    }
  }

  return sum(lowPointsRisk);
};

const printMap = (map: Array<Array<number | undefined>>) => {
  for (let y = 0; y < map.length; ++y) {
    let l = "";
    for (let x = 0; x < map[y].length; ++x) {
      if (map[y] && map[y][x] !== undefined) {
        l += map[y][x];
      } else {
        l += ".";
      }
    }
    console.log(l);
  }
};

const part2 = () => {
  let map = input().map((r) => r.map((e) => (e === 9 ? undefined : e)));

  const clusters: number[][] = [];

  const getCluster = (
    x: number,
    y: number,
    map: Array<Array<number | undefined>>
  ): number[] => {
    let ret = [map[y][x]];
    map[y][x] = undefined;
    if (map[y - 1] && map[y - 1][x] !== undefined) {
      ret = ret.concat(getCluster(x, y - 1, map));
    }
    if (map[y + 1] && map[y + 1][x] !== undefined) {
      ret = ret.concat(getCluster(x, y + 1, map));
    }
    if (map[y][x - 1] !== undefined) {
      ret = ret.concat(getCluster(x - 1, y, map));
    }

    if (map[y][x + 1] !== undefined) {
      ret = ret.concat(getCluster(x + 1, y, map));
    }
    return ret.filter((r) => r !== undefined) as number[];
  };

  while (map.some((r) => r.some((e) => e !== undefined))) {
    // printMap(map);
    const y = map.findIndex((r) => r.some((e) => e !== undefined));
    const x = map[y].findIndex((e) => e !== undefined);
    clusters.push(getCluster(x, y, map));
  }

  const sorted = clusters.sort((a, b) => (a.length > b.length ? -1 : 1));
  return sorted[0].length * sorted[1].length * sorted[2].length;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
