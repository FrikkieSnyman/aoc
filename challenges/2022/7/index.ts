import { flat, sum } from "radash";
import getInput from "../../../utils/getInput";

type File = { size: number; name: string };
type Directory = {
  files: File[];
  directories: Directory[];
  size: number;
  name: string;
  parent: Directory | undefined;
};

type TerminalOutputLine = { type: "output" } & (
  | { outputType: "directory"; name: string }
  | { outputType: "file"; file: File }
);
type TerminalInputLine = { type: "command" } & (
  | { command: "cd"; name: string }
  | { command: "ls"; output: TerminalOutputLine[] }
);

const parseInput = (input: string): TerminalInputLine[] => {
  const ret: TerminalInputLine[] = [];
  const split = input.trim().split("\n");
  let index = 0;
  let line = split[index];
  while (line) {
    if (line[0] === "$") {
      const lineSplit = line.split(" ");
      switch (lineSplit[1]) {
        case "cd":
          ret.push({
            type: "command",
            command: lineSplit[1],
            name: lineSplit[2]
          });
          break;
        case "ls": {
          let outputIndex = index;
          let nextLine = split[++outputIndex];
          const output: TerminalOutputLine[] = [];
          while (nextLine && nextLine[0] !== "$") {
            const splitOutputLine = nextLine.split(" ");
            switch (splitOutputLine[0]) {
              case "dir":
                output.push({
                  type: "output",
                  outputType: "directory",
                  name: splitOutputLine[1]
                });
                break;
              default:
                output.push({
                  type: "output",
                  outputType: "file",
                  file: {
                    name: splitOutputLine[1],
                    size: parseInt(splitOutputLine[0])
                  }
                });
                break;
            }
            nextLine = split[++outputIndex];
          }
          ret.push({ type: "command", command: lineSplit[1], output });
          break;
        }
        default:
          throw new Error("unsupported command");
      }
    }
    line = split[++index];
  }
  return ret;
};

const printTree = (directory: Directory, level: number) => {
  const linePad = new Array(level * 4).join(" ");
  const filePad = new Array((level + 1) * 4).join(" ");
  console.log(linePad, "-", directory.name, `(dir, size=${directory.size})`);
  for (const d of directory.directories) {
    printTree(d, level + 1);
  }
  for (const f of directory.files) {
    console.log(filePad, "-", f.name, `(file, size=${f.size})`);
  }
};

const parseLsCommand = (
  currentDirectory: Directory,
  command: TerminalInputLine & { command: "ls" }
): Directory => {
  // WARNING: MUTATION AHEAD
  command.output.forEach((element) => {
    switch (element.outputType) {
      case "directory":
        if (currentDirectory.directories.find((d) => d.name === element.name)) {
          break;
        }
        currentDirectory.directories.push({
          directories: [],
          files: [],
          name: element.name,
          parent: currentDirectory,
          size: 0
        });
        break;
      case "file":
        if (currentDirectory.files.find((f) => f.name === element.file.name)) {
          break;
        }
        currentDirectory.files.push(element.file);
        currentDirectory.size += element.file.size;
    }
  });
  let p = currentDirectory.parent;
  while (p) {
    p.size += currentDirectory.size;
    p = p.parent;
  }
  return currentDirectory;
};
const parseCdCommand = (
  currentDirectory: Directory,
  command: TerminalInputLine & { command: "cd" }
): Directory => {
  if (command.name === "..") {
    if (!currentDirectory.parent) {
      throw new Error("parent directory does not exist");
    }
    return currentDirectory.parent;
  }
  const dir = currentDirectory.directories.find((d) => d.name === command.name);
  if (!dir) {
    throw new Error("directory not found");
  }
  return dir;
};

const constructDirectoryTree = (
  currentDirectory: Directory,
  input: TerminalInputLine[]
): void => {
  const inputCopy = [...input]; // avoid mutating the original input
  const inputLine = inputCopy.shift();
  if (!inputLine) {
    return;
  }
  switch (inputLine.command) {
    case "cd": {
      const newDir = parseCdCommand(currentDirectory, inputLine);
      return constructDirectoryTree(newDir, inputCopy); // inputCopy has been shifted
    }
    case "ls": {
      parseLsCommand(currentDirectory, inputLine); // mutate the current directory by adding files and directories to itself
      return constructDirectoryTree(currentDirectory, inputCopy); // inputCopy has been shifted
    }
  }
};

const buildDirectoryTree = (terminal: TerminalInputLine[]): Directory => {
  // mutation is the name of the game for this solution
  // building this assuming that `cd /` only ever happens once at the top of the input and that `ls` immediately follows it
  const rootDir: Directory = {
    name: "/",
    directories: [],
    files: [],
    size: 0,
    parent: undefined
  };
  terminal.shift();
  constructDirectoryTree(rootDir, terminal);
  return rootDir;
};

const part1Sum = (directory: Directory, acc = 0): number => {
  if (!directory.directories.length) {
    return acc + directory.size > 100000 ? 0 : directory.size;
  }

  return (
    acc +
    (directory.size > 100000 ? 0 : directory.size) +
    sum(directory.directories.map((d) => part1Sum(d, acc)))
  );
};

const part1 = () => {
  const terminal = parseInput(getInput("2022", "7"));
  const dirTree = buildDirectoryTree(terminal);

  return part1Sum(dirTree, 0);
};

const part2SmallestDirSize = (
  toDelete: number,
  minSoFar: number,
  directory: Directory
): Directory[] => {
  if (directory.size < toDelete || directory.size > minSoFar) {
    return [];
  }

  return [
    directory,
    ...flat(
      directory.directories.map((d) =>
        part2SmallestDirSize(toDelete, directory.size, d)
      )
    )
  ].sort((a, b) => a.size - b.size);
};

const part2 = () => {
  const terminal = parseInput(getInput("2022", "7"));
  const dirTree = buildDirectoryTree(terminal);
  const totalDisk = 70000000;
  const minDisk = 30000000;
  const toDelete = minDisk - (totalDisk - dirTree.size);
  const dirs = part2SmallestDirSize(toDelete, dirTree.size, dirTree);

  return dirs[0].size;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
