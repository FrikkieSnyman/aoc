import getInput from "../../../utils/getInput";

type Vector = { x1: number; y1: number; x2: number; y2: number };

const input = (): Vector[] => {
  const i = getInput("2021", "5");

  return i
    .split("\n")
    .map((v) => {
      if (!v) {
        return;
      }
      const vecs = v.split(" -> ").map((s) => s.split(",").map(Number));
      return { x1: vecs[0][0], y1: vecs[0][1], x2: vecs[1][0], y2: vecs[1][1] };
    })
    .filter((l) => !!l) as Vector[];
};

const lineFunction = (vec: Vector) => {
  let m = findM(vec);
  let c: number;
  if (!isFinite(m)) {
    c = vec.y1;
    m = 0;
  } else {
    c = vec.y1 - m * vec.x1;
  }
  return (x: number) => m * x + c;
};

const findM = (vec: Vector): number => {
  return (vec.y2 - vec.y1) / (vec.x2 - vec.x1);
};

const getMapCount = (vecs: Vector[]): number[][] => {
  const ret: number[][] = [];
  vecs.forEach((v) => {
    const line = lineFunction(v);
    if (!isFinite(findM(v))) {
      for (let y = Math.min(v.y1, v.y2); y <= Math.max(v.y1, v.y2); ++y) {
        const x = v.x1;
        if (!ret[y]) {
          ret[y] = [];
        }
        if (!ret[y][x]) {
          ret[y][x] = 1;
        } else {
          ret[y][x]++;
        }
      }
    } else {
      for (let x = Math.min(v.x1, v.x2); x <= Math.max(v.x1, v.x2); ++x) {
        const y = line(x);
        if (!ret[y]) {
          ret[y] = [];
        }
        if (!ret[y][x]) {
          ret[y][x] = 1;
        } else {
          ret[y][x]++;
        }
      }
    }
  });
  return ret;
};

const printMap = (vecs: Vector[]) => {
  const map = getMapCount(vecs);
  const maxX = Math.max(...vecs.map((v) => Math.max(v.x1, v.x2)));
  const maxY = Math.max(...vecs.map((v) => Math.max(v.y1, v.y2)));

  for (let y = 0; y <= maxY; ++y) {
    let l = "";
    for (let x = 0; x <= maxX; ++x) {
      l += (map[y] && map[y][x]) || ".";
    }
    console.log(l);
  }
};

const getPointsGreaterThan2 = (vecs: Vector[]) => {
  const map = getMapCount(vecs);
  const maxX = Math.max(...vecs.map((v) => Math.max(v.x1, v.x2)));
  const maxY = Math.max(...vecs.map((v) => Math.max(v.y1, v.y2)));
  let count = 0;
  for (let y = 0; y <= maxY; ++y) {
    for (let x = 0; x <= maxX; ++x) {
      if (map[y] && map[y][x] >= 2) {
        count++;
      }
    }
  }
  return count;
};

const part1 = () => {
  const vecs = input();
  const straights = vecs.filter((v) => v.x1 === v.x2 || v.y1 === v.y2);
  return getPointsGreaterThan2(straights);
};

const part2 = () => {
  const vecs = input();
  return getPointsGreaterThan2(vecs);
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
