import {
  InputBoard,
  InputBoardWithJoins,
  Join,
  JoinPointer,
  Joins,
} from "../constants";

export const findJoinAtBoard = (board: InputBoardWithJoins) =>
  findJoinFromJoins(board.joins);

export const findJoinFromJoins = (joins: Joins) => ({
  x,
  y,
}: JoinPointer): Join | null => {
  if (joins[`${x},${y}`] != null) {
    return joins[`${x},${y}`];
  } else {
    return null;
  }
};
