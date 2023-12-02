export const BAG_CONTENT = {
  red: 12,
  green: 13,
  blue: 14,
} as const;

export const isColor = (value: string): value is Color => {
  return Object.keys(BAG_CONTENT).includes(value);
};

export type Color = keyof typeof BAG_CONTENT;
export type Bag = Record<Color, number>;
export type Set = Partial<Bag>;
export type Games = Record<number, Set[]>;
