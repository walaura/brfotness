export const SPACE = 60;
export const DOT_SIZE = 10;
export const PADDING = 30;

export type JoinPointer = {
  x: number;
  y: number;
};

export type Join = JoinPointer & {
  lines: Set<Line>;
};

export type Line = {
  from: Join;
  to: Join;
};
