import run from "aocrunner";
type Crate = string;

type Stack = Crate[];

type Instruction = {
  quantity: number;
  from: number;
  to: number;
};

type Data = {
  instructions: Instruction[];
  stacks: Stack[];
};

const parseInput = (input: string): Data => {
  const split = input.split("\n\n");
  const stacksInput = split[0];
  let maxIndex = 0;
  const pivotedStacks: Stack[] = stacksInput
    .split("\n")
    .reverse()
    .map((s, i) => {
      if (i === 0) {
        const indexes = s.trim().split(/\s+/);
        maxIndex = parseInt(indexes[indexes.length - 1]);
        return indexes;
      }
      const ret: string[] = [];
      for (let i = 1; i < maxIndex * 4; i += 4) {
        ret.push(s[i]);
      }
      return ret;
    });

  const stacks: Stack[] = [];
  pivotedStacks.slice(1).forEach((stack) => {
    stack.forEach((c, index) => {
      if (c === " ") {
        return;
      }
      if (stacks[index]) {
        stacks[index].push(c);
        return;
      }
      stacks[index] = [c];
    });
  });
  const instructions: Instruction[] = split[1]
    .trim()
    .split("\n")
    .map((i) => {
      const matches = i.match(/move (\d+) from (\d+) to (\d+)/);
      if (!matches || !matches[1] || !matches[2] || !matches[3]) {
        throw new Error("failed to parse instruction");
      }
      return {
        quantity: parseInt(matches[1]),
        from: parseInt(matches[2]) - 1,
        to: parseInt(matches[3]) - 1,
      };
    });

  return { stacks, instructions };
};

const executeInstruction = (
  instruction: Instruction,
  stacks: Stack[],
): Stack[] => {
  if (instruction.quantity === 0) {
    return stacks;
  }
  const stacksCopy = [...stacks];
  stacksCopy[instruction.to].push(stacksCopy[instruction.from].pop()!);
  return executeInstruction(
    { ...instruction, quantity: instruction.quantity - 1 },
    stacksCopy,
  );
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let index = 0;
  let instruction = input.instructions[index];
  let stacks = input.stacks;
  while (instruction) {
    stacks = executeInstruction(instruction, stacks);
    instruction = input.instructions[++index];
  }
  return stacks.map((s) => s.pop()).join("");
};
const executeInstructionSameOrder = (
  instruction: Instruction,
  stacks: Stack[],
): Stack[] => {
  const stacksCopy = [...stacks];
  const push: string[] = [];
  for (let i = 0; i < instruction.quantity; i++) {
    push.push(stacksCopy[instruction.from].pop()!);
  }
  stacksCopy[instruction.to].push(...push.reverse());
  return stacksCopy;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let index = 0;
  let instruction = input.instructions[index];
  let stacks = input.stacks;
  while (instruction) {
    stacks = executeInstructionSameOrder(instruction, stacks);
    instruction = input.instructions[++index];
  }
  return stacks.map((s) => s.pop()).join("");
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
