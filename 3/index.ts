import { getAnswer as getAnswer_part1 } from "./part1";

const engine = [];

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const lines = chunkText.split("\n").filter((line) => line);

  for (const line of lines) {
    engine.push(line);
  }
}

console.log(`Part 1: ${getAnswer_part1(engine)}`);
