const { readFileSync } = require("fs");

export default function readInputFile(
  year: string,
  day: string,
  sample?: boolean
): string {
  return readFileSync(
    `challenges/${year}/${day}/input${sample ? "_sample" : ""}.txt`,
    "utf-8"
  );
}
