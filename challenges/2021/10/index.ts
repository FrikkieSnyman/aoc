import getInput from "../../../utils/getInput";

const points: { [key in ClosingBracket]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const autoCompletePoints: { [key in ClosingBracket]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const pairs: { [key in OpenBracket]: ClosingBracket } = {
  "(": ")",
  "{": "}",
  "[": "]",
  "<": ">",
};
type OpenBracket = "(" | "[" | "{" | "<";
type ClosingBracket = ")" | "]" | "}" | ">";
type Bracket = OpenBracket | ClosingBracket;

export const input = (): Bracket[][] => {
  const i = getInput("2021", "10", false).trim();
  return i.split("\n").map((l) => l.split("") as Bracket[]);
};

const part1 = () => {
  const lines = input();
  let score = 0;
  lines.forEach((l) => {
    const openers: OpenBracket[] = [];
    for (const b of l) {
      if (pairs[b as OpenBracket]) {
        openers.push(b as OpenBracket);
        continue;
      }
      const lastOpener = openers.pop();
      if (!lastOpener || pairs[lastOpener] !== b) {
        score += points[b as ClosingBracket];
        break;
      }
    }
  });
  return score;
};

const part2 = () => {
  const lines = input();

  const scores: number[] = [];
  lines.forEach((l) => {
    let score = 0;
    const openers: OpenBracket[] = [];
    let corrupted = false;
    for (const b of l) {
      if (pairs[b as OpenBracket]) {
        openers.push(b as OpenBracket);
        continue;
      }
      const lastOpener = openers[openers.length - 1];
      if (!lastOpener || pairs[lastOpener] !== b) {
        // line corrupted, ignore
        corrupted = true;
        break;
      }
      if (pairs[lastOpener] === b) {
        openers.pop();
      }
    }

    if (corrupted) {
      return;
    }
    openers.reverse().forEach((o) => {
      score *= 5;
      score += autoCompletePoints[pairs[o]];
    });

    scores.push(score);
  });
  return scores.sort((a, b) => (a < b ? 1 : -1))[Math.floor(scores.length / 2)];
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
