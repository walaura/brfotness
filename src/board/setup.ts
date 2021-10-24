import {
  InputBoardWithJoinsAndLines,
  InputBoardWithJoins,
  Line,
  Lines,
  Joins,
  SerializedLines,
  JoinPointer,
  Join,
} from "../constants";
import STARTING_BOARD from "./STARTING_BOARD";
import { findJoinAtBoard, findJoinFromJoins } from "./traverse";

const setupJoin = (joins: Joins, { x, y }: JoinPointer): [Join, Joins] => {
  if (joins[`${x},${y}`]) {
    return [joins[`${x},${y}`], joins];
  }
  const join: Join = {
    x,
    y,
    lines: new Set(),
  };
  joins[`${x},${y}`] = join;
  return [join, joins];
};

const addJoinReferences = (
  board: InputBoardWithJoinsAndLines
): InputBoardWithJoinsAndLines => {
  for (let [_, join] of Object.entries(board.joins)) {
    join.lines = new Set();
  }
  for (let line of board.lines) {
    line.points[0].lines.add(line);
    line.points[1].lines.add(line);
  }
  return board;
};

const setUpInitialBoard = (
  slines: SerializedLines
): InputBoardWithJoinsAndLines => {
  let joins: Joins = {};
  let lines: Set<Line> = new Set();

  for (let sline of slines) {
    let join1, join2;
    [join1, joins] = setupJoin(joins, { x: sline[0], y: sline[1] });
    [join2, joins] = setupJoin(joins, { x: sline[2], y: sline[3] });
    const line: Line = {
      points: [join1, join2],
    };
    lines.add(line);
  }

  return { joins, lines };
};

const serializeLines = (lines: Lines): SerializedLines =>
  [...lines].map((line) => [
    line.points[0].x,
    line.points[0].y,
    line.points[1].x,
    line.points[1].y,
  ]);

export const getBoard = (): InputBoardWithJoinsAndLines => {
  let board = addJoinReferences(
    setUpInitialBoard(STARTING_BOARD as SerializedLines)
  );
  console.log(board);
  const findJoin = findJoinAtBoard(board);
  board.start = findJoin({ x: 2, y: 2 });
  board.end = findJoin({ x: 4, y: 0 });

  return board;
};

export const toggleLineOnBoard = (
  board: InputBoardWithJoinsAndLines,
  findLine: Line
): InputBoardWithJoinsAndLines => {
  let newLines: Lines = new Set();
  let wasRemoved = false;
  for (var line of board.lines) {
    if (line.points.every((point) => findLine.points.includes(point))) {
      wasRemoved = true;
    } else {
      newLines.add(line);
    }
  }
  if (!wasRemoved) {
    newLines.add(findLine);
  }
  return addJoinReferences({
    ...board,
    lines: newLines,
  });
};
