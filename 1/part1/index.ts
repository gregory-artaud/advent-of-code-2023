export const decryptLine = (line: string) => {
  const firstDigit = line.split('').find((char) => char >= '0' && char <= '9');
  const lastDigit = line.split('').findLast((char) => char >= '0' && char <= '9');

  return parseInt(`${firstDigit}${lastDigit}`);
};