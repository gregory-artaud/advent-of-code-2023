import { Bag, Games, Set } from "../types";

const getMinimumBag = (sets: Set[]): Bag => {
  const reds = sets.map((set) => set.red ?? 0);
  const greens = sets.map((set) => set.green ?? 0);
  const blues = sets.map((set) => set.blue ?? 0);

  return {
    red: Math.max(...reds),
    green: Math.max(...greens),
    blue: Math.max(...blues),
  };
};

const getBagPower = (bag: Bag): number => {
  return bag.red * bag.green * bag.blue;
};

export const getAnswer = (games: Games) => {
  const minimumBags = Object.entries(games).map(([_id, sets]) =>
    getMinimumBag(sets)
  );
  const bagPowers = minimumBags.map(getBagPower);

  return bagPowers.reduce((acc, power) => power + acc, 0);
};
