export const isDigit = (c: string) => {
  return c >= "0" && c <= "9";
};

export const numberLength = (number: number): number => {
  return Math.floor(Math.log10(number)) + 1;
};
