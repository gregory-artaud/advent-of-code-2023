import { BAG_CONTENT, Games, Set, isColor } from "../types";

const isValidSet = (set: Set): boolean => {
  return Object.entries(set).every(([color, count]) => {
    if (!isColor(color)) {
      throw new Error(`unknown color: ${color}`);
    }
    return BAG_CONTENT[color] >= count;
  });
};

export const getAnswer = (games: Games) => {
  const validGames = Object.entries(games).filter(([_id, sets]) =>
    sets.every(isValidSet)
  );
  const validIds = validGames.map(([id, _sets]) => id);
  return validIds.reduce((acc, id) => parseInt(id) + acc, 0);
};
