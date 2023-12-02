import { getAnswer as getAnswer_part1 } from "./part1";
import { getAnswer as getAnswer_part2 } from "./part2";
import { Games, Set, isColor } from "./types";

const getIdFromLine = (line: string): number => {
  return parseInt(line.split(":")[0].split(" ")[1]);
};

const setStringToSet = (setString: string): Set => {
  const set: Set = {};
  const colorCounts = setString.split(",");

  for (const colorCount of colorCounts) {
    const [count, color] = colorCount.trim().split(" ");

    if (!isColor(color)) {
      throw new Error(`unknown color: ${color}`);
    }
    set[color] = parseInt(count);
  }
  return set;
};

const getSetsFromLine = (line: string): Set[] => {
  const setStrings = line.split(":")[1].split(";");

  return setStrings.map((setString) => setStringToSet(setString));
};

const games: Games = {};
let savedLine = "";

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = `${savedLine}${Buffer.from(chunk).toString()}`;
  const lines = chunkText.split("\n").filter((line) => line);

  for (const line of lines) {
    try {
      games[getIdFromLine(line)] = getSetsFromLine(line);
    } catch (e) {
      savedLine = line;
      break;
    }
  }
}

console.log(`Part 1: ${getAnswer_part1(games)}`);
console.log(`Part 2: ${getAnswer_part2(games)}`);
