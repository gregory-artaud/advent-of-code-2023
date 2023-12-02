import { decryptLine as decryptLine_part1 } from "./part1";
import { decryptLine as decryptLine_part2 } from "./part2";

const getSum = (numbers: number[]) => {
  return numbers.reduce((acc, number) => acc + number, 0);
}

for await (const chunk of Bun.stdin.stream()) {
  const chunkText = Buffer.from(chunk).toString();
  const lines = chunkText.split('\n').filter((line) => line);

  const part1_decryptedLines = lines.map(decryptLine_part1);
  const part1_sum = getSum(part1_decryptedLines);

  const part2_decryptedLines = lines.map(decryptLine_part2);
  const part2_sum = getSum(part2_decryptedLines);

  console.log(`Part 1: ${part1_sum}`);
  console.log(`Part 2: ${part2_sum}`);
}