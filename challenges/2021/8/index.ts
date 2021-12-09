import getInput from "../../../utils/getInput";
type SignalWire = "a" | "b" | "c" | "d" | "e" | "f" | "g";
type Signal = number[]; // bit array
type IndexMap = number[][];
type Line = {
  signals: Signal[];
  outputs: Signal[];
};

const correct = [
  "1111110".split("").map(Number),
  "0110000".split("").map(Number),
  "1101101".split("").map(Number),
  "1111001".split("").map(Number),
  "0110011".split("").map(Number),
  "1011011".split("").map(Number),
  "1011111".split("").map(Number),
  "1110000".split("").map(Number),
  "1111111".split("").map(Number),
  "1111011".split("").map(Number),
];

const mapToSignal = (wire: SignalWire[]): Signal => {
  return [
    wire.includes("a") ? 1 : 0,
    wire.includes("b") ? 1 : 0,
    wire.includes("c") ? 1 : 0,
    wire.includes("d") ? 1 : 0,
    wire.includes("e") ? 1 : 0,
    wire.includes("f") ? 1 : 0,
    wire.includes("g") ? 1 : 0,
  ];
};
const input = (): Line[] => {
  const i = getInput("2021", "8", true);

  return i
    .trim()
    .split("\n")
    .map((l) => {
      const [signals, output] = l.split(" | ");
      return {
        signals: signals
          .split(" ")
          .map((s) => mapToSignal(s.split("") as SignalWire[])),
        outputs: output
          .split(" ")
          .map((o) => mapToSignal(o.split("") as SignalWire[])),
      };
    });
};

const countUnique = (signals: Signal[]): number => {
  return signals.filter((signal) => [2, 3, 4, 7].includes(countOnBits(signal)))
    .length;
};

const countOnBits = (bits: number[]): number =>
  bits.filter((s) => s === 1).length;

const toByte = (bits: number[]): number => {
  return parseInt(bits.join(""), 2);
};

const toBitArray = (n: number): number[] => {
  const arr = n.toString(2).split("").map(Number);
  while (arr.length < 7) {
    arr.unshift(0);
  }
  return arr;
};

const part1 = () => {
  const signals = input();
  let sum = 0;
  signals.forEach((s) => {
    sum += countUnique(s.outputs);
  });
  return sum;
};

const part2 = () => {
  const signals = input().slice(0, 1);
  signals.forEach((s) => {
    const indexMap: IndexMap = [];
    const [one, seven, four, eight] = s.signals
      .filter((signal) => [2, 3, 4, 7].includes(countOnBits(signal)))
      .sort((a, b) => (countOnBits(a) > countOnBits(b) ? 1 : -1));

    console.log(~toByte(one), toByte(correct[1]));
    console.log(~toByte(seven), toByte(correct[7]));

    const topIndex = toBitArray(toByte(one) ^ toByte(seven)).indexOf(1);
    indexMap[0] = [topIndex];
    indexMap[2] = [one.indexOf(1), one.lastIndexOf(1)];
    indexMap[5] = [one.indexOf(1), one.lastIndexOf(1)];
  });
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
