import run from "aocrunner";
import BigNumber from "bignumber.js";

type Monkey = {
  items: BigNumber[];
  inspection: (old: BigNumber, monkey: Monkey) => BigNumber;
  test: (worry: BigNumber) => boolean;
  action: [number, number];
  totalInspections: number;
};

const parseInput = (rawInput: string): Monkey[] => {
  return rawInput.split("\n\n").map((m) => {
    const attributes = m.split("\n");
    const items = attributes[1]
      .split(": ")[1]
      .split(", ")
      .map((i) => new BigNumber(i));
    const inspection = (old: BigNumber, monkey: Monkey): BigNumber => {
      monkey.totalInspections++;
      const f = attributes[2].split("new = ")[1].split(" ");
      const op = f[1];
      const left: BigNumber = f[0] === "old" ? old : new BigNumber(f[0]);
      const right: BigNumber = f[2] === "old" ? old : new BigNumber(f[2]);
      // const start = Date.now();
      let r: BigNumber;
      switch (op) {
        case "+":
          r = left.plus(right);
          break;
        case "*":
          r = left.multipliedBy(right);
          break;
        default:
          throw new Error("unsupported op");
      }
      // console.log(Date.now() - start);
      return r;
    };
    const mod = parseInt(attributes[3].split("divisible by ")[1]);
    const test = (worry: BigNumber) => {
      const r = worry.mod(mod).comparedTo(0) === 0;
      return r;
    };

    const action: [number, number] = [
      parseInt(attributes[4].split("throw to monkey ")[1]),
      parseInt(attributes[5].split("throw to monkey ")[1]),
    ];
    return {
      items,
      inspection,
      test,
      action,
      totalInspections: 0,
    };
  });
};

const playTurn = (
  monkey: Monkey,
  monkeys: Monkey[],
  decreasingWorry: boolean,
) => {
  let item = monkey.items.shift();
  while (item) {
    // const start = Date.now();
    const updatedWorry = decreasingWorry
      ? monkey
          .inspection(item, monkey)
          .dividedBy(3)
          .decimalPlaces(0, BigNumber.ROUND_FLOOR)
      : monkey.inspection(item, monkey);
    // const t1 = Date.now();
    monkeys[monkey.action[monkey.test(updatedWorry) ? 0 : 1]].items.push(
      updatedWorry,
    );
    // const t2 = Date.now();
    item = monkey.items.shift();
    // console.log(t1 - start, t2 - t1, Date.now() - t2);
  }
};

const playRound = (monkeys: Monkey[], decreasingWorry: boolean) => {
  for (const monkey of monkeys) {
    playTurn(monkey, monkeys, decreasingWorry);
  }
};

const playRounds = (
  totalRounds: number,
  monkeys: Monkey[],
  decreasingWorry = true,
) => {
  for (let i = 0; i < totalRounds; ++i) {
    // if (!decreasingWorry) {
    // console.log("playing round", i);
    // }
    playRound(monkeys, decreasingWorry);
  }
};

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  playRounds(20, monkeys);
  const sorted = monkeys.sort(
    (a, b) => b.totalInspections - a.totalInspections,
  );
  return sorted[0].totalInspections * sorted[1].totalInspections;
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);
  // playRounds(10000, monkeys, false);
  const sorted = monkeys.sort(
    (a, b) => b.totalInspections - a.totalInspections,
  );
  console.log(sorted.map((m) => m.totalInspections));
  return sorted[0].totalInspections * sorted[1].totalInspections;
};

run({
  part1: {
    tests: [
      {
        input: `
      Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1
        `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3
      
      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1
        `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
