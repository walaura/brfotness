export const SPACE = 60;
export const DOT_SIZE = 10;
export const PADDING = 30;

export type Joins = { [key: string]: Join };
export type Lines = Set<Line>;

export type JoinPointer = {
  x: number;
  y: number;
};

export type Join = JoinPointer & {
  lines: Set<Line>;
};

// x1, y1, x2, y2
export type SerializedLine = [number, number, number, number];
export type SerializedLines = SerializedLine[];

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

export type InputBoardWithJoins = InputBoard & {
  joins: Joins;
};
export type InputBoardWithJoinsAndLines = InputBoardWithJoins & {
  joins: Joins;
  lines: Set<Line>;
};
