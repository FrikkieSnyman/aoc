import Victor from "victor";
import run from "aocrunner";
type Direction = "U" | "D" | "L" | "R";
const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((l) => {
    const [dir, count] = l.split(" ");
    return [dir as Direction, parseInt(count)] as [Direction, number];
  });

const getVectorFromDirection = (direction: Direction): Victor => {
  switch (direction) {
    case "L":
      return new Victor(-1, 0);
    case "R":
      return new Victor(1, 0);
    case "U":
      return new Victor(0, -1);
    case "D":
      return new Victor(0, 1);
  }
};

const getNormalizedDirectionVectorBetweenPoints = (
  a: Victor,
  b: Victor,
): Victor => {
  const d = a.clone().subtract(b).normalize();
  return new Victor(
    d.x < 0 ? -1 : d.x > 0 ? 1 : 0,
    d.y < 0 ? -1 : d.y > 0 ? 1 : 0,
  );
};

const move = (v: Victor, direction: Victor) => v.add(direction);

const processInstruction = (
  [dir, count]: [Direction, number],
  knots: Victor[],
  visits: Record<string, number>,
) => {
  const directionVector = getVectorFromDirection(dir);
  while (count > 0) {
    move(knots[0], directionVector);
    for (let i = 1; i < knots.length; ++i) {
      if (knots[i - 1].distance(knots[i]) >= 2) {
        move(
          knots[i],
          getNormalizedDirectionVectorBetweenPoints(knots[i - 1], knots[i]),
        );
        if (i === knots.length - 1) {
          visits[knots[i].toString()] = (visits[knots[i].toString()] || 0) + 1;
        }
      }
    }

    count--;
  }
};

const getKnots = (amount: number): Victor[] => {
  const ret: Victor[] = [];
  for (let i = 0; i < amount; ++i) {
    ret.push(new Victor(0, 0));
  }
  return ret;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const knots = getKnots(2);
  const visits: Record<string, number> = {
    [knots[knots.length - 1].toString()]: 1,
  };
  let index = 0;
  let instruction = input[index];
  while (instruction) {
    processInstruction(instruction, knots, visits);
    instruction = input[++index];
  }
  return Object.keys(visits).length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const knots = getKnots(10);
  const visits: Record<string, number> = {
    [knots[knots.length - 1].toString()]: 1,
  };
  let index = 0;
  let instruction = input[index];
  while (instruction) {
    processInstruction(instruction, knots, visits);
    instruction = input[++index];
  }
  return Object.keys(visits).length;
};

run({
  part1: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        R 4
        U 4
        L 3
        D 1
        R 4
        D 1
        L 5
        R 2
        `,
        expected: 1,
      },
      {
        input: `
        R 5
        U 8
        L 8
        D 3
        R 17
        D 10
        L 25
        U 20
        `,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
