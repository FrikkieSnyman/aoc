import getInput from "../../../utils/getInput";

const input = () => {
  const i = getInput("2021", "3");
  return i.split("\n").map((b) => b.split("").map(Number));
};

const part1 = () => {
  const bins = input();
  const l = bins[0].length;
  const gamma = [];
  const epsilon = [];
  for (let i = 0; i < l; ++i) {
    const count = [0, 0];
    bins.forEach((b) => {
      const char = b[i];
      count[char]++;
    });
    const [zero, one] = count;

    gamma.push(zero > one ? 0 : 1);
    epsilon.push(zero > one ? 1 : 0);
  }
  const gDec = parseInt(gamma.join(""), 2);
  const eDec = parseInt(epsilon.join(""), 2);
  return gDec * eDec;
};

const part2 = () => {
  const bins = input();
  const l = bins[0].length;
  let oxy: number[] = [];
  let co2: number[] = [];
  let binsCopy = [...bins];
  for (let i = 0; i < l; ++i) {
    const count = [0, 0];
    binsCopy.forEach((b) => {
      const char = b[i];
      count[char]++;
    });
    const [zero, one] = count;

    if (zero > one) {
      binsCopy = binsCopy.filter((b) => b[i] === 0);
    } else {
      binsCopy = binsCopy.filter((b) => b[i] === 1);
    }
    if (binsCopy.length < 2) {
      oxy = [...binsCopy[0]];
      break;
    }
  }
  binsCopy = [...bins];
  for (let i = 0; i < l; ++i) {
    const count = [0, 0];
    binsCopy.forEach((b) => {
      const char = b[i];
      count[char]++;
    });
    const [zero, one] = count;

    if (zero > one) {
      binsCopy = binsCopy.filter((b) => b[i] === 1);
    } else {
      binsCopy = binsCopy.filter((b) => b[i] === 0);
    }
    if (binsCopy.length < 2) {
      co2 = [...binsCopy[0]];
      break;
    }
  }
  const oxyDec = parseInt(oxy.join(""), 2);
  const co2Dec = parseInt(co2.join(""), 2);
  return oxyDec * co2Dec;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
