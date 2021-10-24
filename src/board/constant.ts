import { InputBoardWithJoinsAndLines } from "../constants";

declare module globalThis {
  let input: InputBoardWithJoinsAndLines;
}

export const getGlobalBoard = () => {
  return globalThis.input as InputBoardWithJoinsAndLines;
};

export const setGlobalBoard = (board: InputBoardWithJoinsAndLines) => {
  globalThis.input = board;
};
