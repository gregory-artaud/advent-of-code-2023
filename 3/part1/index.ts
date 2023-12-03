import { isDigit, numberLength } from "../common";

const isPartNeighborhood = (neighborhood: string[]): boolean => {
  return neighborhood.some((c) => c !== "." && !isDigit(c));
};

// line x, column y
const getNeighborhood = (
  splittedEngine: string[][],
  x: number,
  y: number,
  length: number
): string[] => {
  const neighborhood: string[] = [];

  for (let i = 0; i < 3; ++i) {
    const currentLineIndex = x - 1 + i;
    if (currentLineIndex < 0 || currentLineIndex >= splittedEngine.length) {
      continue;
    }
    for (let j = 0; j < length + 2; ++j) {
      const currentColumnIndex = y - 1 + j;
      if (
        currentColumnIndex < 0 ||
        currentColumnIndex >= splittedEngine[i].length ||
        // ignore number to process only the neighborhood
        (currentLineIndex === x &&
          currentColumnIndex >= y &&
          currentColumnIndex < y + length)
      ) {
        continue;
      }
      neighborhood.push(splittedEngine[currentLineIndex][currentColumnIndex]);
    }
  }
  return neighborhood;
};

export const getAnswer = (engine: string[]) => {
  const numberToNeighborhood: { n: number; neighborhood: string[] }[] = [];
  const splittedEngine = engine.map((line) => line.split(""));

  for (let i = 0; i < splittedEngine.length; ++i) {
    for (let j = 0; j < splittedEngine[i].length; ++j) {
      if (isDigit(splittedEngine[i][j])) {
        const foundNumber = parseInt(engine[i].slice(j));
        const foundNumberLength = numberLength(foundNumber);
        const neighborhood = getNeighborhood(
          splittedEngine,
          i,
          j,
          foundNumberLength
        );

        numberToNeighborhood.push({
          n: foundNumber,
          neighborhood,
        });
        j += foundNumberLength;
      }
    }
  }

  const partNumbers = numberToNeighborhood
    .filter(({ n, neighborhood }) => isPartNeighborhood(neighborhood))
    .map(({ n, neighborhood }) => n);

  return partNumbers.reduce((acc, val) => acc + val, 0);
};
