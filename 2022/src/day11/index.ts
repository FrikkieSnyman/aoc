import run from "aocrunner";
import { BigInteger } from "jsbn";

type Monkey = {
  items: BigInteger[];
  inspection: (old: BigInteger, monkey: Monkey) => BigInteger;
  test: (worry: BigInteger) => boolean;
  action: [number, number];
  totalInspections: number;
  m: number;
};

const lcm = (...arr: number[]) => {
  const gcd = (x: number, y: number): number => (!y ? x : gcd(y, x % y));
  const _lcm = (x: number, y: number) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

const parseInput = (rawInput: string): Monkey[] => {
  return rawInput.split("\n\n").map((m) => {
    const attributes = m.split("\n");
    const items = attributes[1]
      .split(": ")[1]
      .split(", ")
      .map((i) => new BigInteger(i));
    const inspection = (old: BigInteger, monkey: Monkey): BigInteger => {
      monkey.totalInspections++;
      const f = attributes[2].split("new = ")[1].split(" ");
      const op = f[1];
      const left: BigInteger = f[0] === "old" ? old : new BigInteger(f[0]);
      const right: BigInteger = f[2] === "old" ? old : new BigInteger(f[2]);
      switch (op) {
        case "+":
          return left.add(right);
        case "*":
          return left.multiply(right);
        default:
          throw new Error("unsupported op");
      }
    };
    const mod = new BigInteger(attributes[3].split("divisible by ")[1]);
    const test = (worry: BigInteger) => {
      const r = worry.mod(mod).compareTo(new BigInteger("0")) === 0;
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
      m: mod.intValue(),
    };
  });
};

const playTurn = (monkey: Monkey, monkeys: Monkey[], lcm?: BigInteger) => {
  let item = monkey.items.shift();
  while (item) {
    let updatedWorry;
    if (lcm) {
      updatedWorry = monkey.inspection(item, monkey).mod(lcm);
    } else {
      updatedWorry = monkey
        .inspection(item, monkey)
        .divide(new BigInteger("3"));
    }
    monkeys[monkey.action[monkey.test(updatedWorry) ? 0 : 1]].items.push(
      updatedWorry,
    );
    item = monkey.items.shift();
  }
};

const playRound = (monkeys: Monkey[], lcm?: BigInteger) => {
  for (const monkey of monkeys) {
    playTurn(monkey, monkeys, lcm);
  }
};

const playRounds = (
  totalRounds: number,
  monkeys: Monkey[],
  lcm?: BigInteger,
) => {
  for (let i = 0; i < totalRounds; ++i) {
    playRound(monkeys, lcm);
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
  const leastCommonMult = lcm(...monkeys.map((m) => m.m));
  playRounds(10000, monkeys, new BigInteger(leastCommonMult + ""));
  const sorted = monkeys.sort(
    (a, b) => b.totalInspections - a.totalInspections,
  );
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
  onlyTests: false,
});
