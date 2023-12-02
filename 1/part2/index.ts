const spelledToNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven:7,
  eight: 8,
  nine: 9,
} as const;

type SpelledNumber = keyof typeof spelledToNumbers;
type Number = typeof spelledToNumbers[SpelledNumber];

const spelledNumbers = Object.keys(spelledToNumbers) as SpelledNumber[];
const numbers = Object.values(spelledToNumbers) as Number[];

export const decryptLine = (line: string) => {
  let firstNumberIndex = line.split('').findIndex((char) => char >= '0' && char <= '9');
  firstNumberIndex = firstNumberIndex === -1 ? Infinity : firstNumberIndex;
  const firstSpelledIndex = Math.min(...spelledNumbers.map((spelledNumber) => line.indexOf(spelledNumber)).filter((index) => index !== -1));
  let firstDigit: number;

  if (firstNumberIndex < firstSpelledIndex) {
    firstDigit = parseInt(line[firstNumberIndex]);
  } else {
    const spelledNumber = spelledNumbers.find((spelledNumber) => line.indexOf(spelledNumber) === firstSpelledIndex);

    if (!spelledNumber) {
      throw new Error(`Could not find spelled number at index ${firstSpelledIndex}`);
    }

    firstDigit = spelledToNumbers[spelledNumber];
  }

  let lastNumberIndex = line.split('').findLastIndex((char) => char >= '0' && char <= '9');
  lastNumberIndex = lastNumberIndex === -1 ? -Infinity : lastNumberIndex;
  const lastSpelledIndex = Math.max(...spelledNumbers.map((spelledNumber) => line.lastIndexOf(spelledNumber)).filter((index) => index !== -1));
  let lastDigit: number;

  if (lastNumberIndex > lastSpelledIndex) {
    lastDigit = parseInt(line[lastNumberIndex]);
  } else {
    const spelledNumber = spelledNumbers.find((spelledNumber) => line.lastIndexOf(spelledNumber) === lastSpelledIndex);

    if (!spelledNumber) {
      throw new Error(`Could not find spelled number at index ${lastSpelledIndex}`);
    }

    lastDigit = spelledToNumbers[spelledNumber];
  }

  return parseInt(`${firstDigit}${lastDigit}`);
};