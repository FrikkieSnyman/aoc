import getInput from "../../../utils/getInput";

const input = () => {
  const i = getInput("2021", "2");
  const commands = i.split("\n").map((c) => {
    const [direction, distance] = c.split(" ");
    return { direction, distance: +distance };
  });
  return commands;
};

const part1 = () => {
  const pos = { x: 0, y: 0 };
  const commands = input();

  commands.forEach((c) => {
    if (c.direction === "forward") {
      pos.x += c.distance;
    }
    if (c.direction === "up") {
      pos.y -= c.distance;
    }
    if (c.direction === "down") {
      pos.y += c.distance;
    }
  });

  return pos.x * pos.y;
};

const part2 = () => {
  const pos = { x: 0, y: 0, aim: 0 };
  const commands = input();

  commands.forEach((c) => {
    if (c.direction === "forward") {
      pos.x += c.distance;
      pos.y += c.distance * pos.aim;
    }
    if (c.direction === "up") {
      pos.aim -= c.distance;
    }
    if (c.direction === "down") {
      pos.aim += c.distance;
    }
  });

  return pos.x * pos.y;
};

console.log(`Solution 1: ${part1()}`);
console.log(`Solution 2: ${part2()}`);
