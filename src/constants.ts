export const SPACE = 60;
export const DOT_SIZE = 10;
export const PADDING = 30;

export type Joins = { [key: string]: Join };

export type JoinPointer = {
  x: number;
  y: number;
};

export type Join = JoinPointer & {
  lines: Set<Line>;
};

export type Line = {
  points: [Join, Join];
};

export type Board = NonNullable<InputBoard> & {
  path: Set<Line>;
};

export type InputBoard = {
  lines?: Set<Line>;
  joins?: Joins;
  start?: Join;
  end?: Join;
};
