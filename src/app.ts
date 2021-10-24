import { drawDot, drawLine } from "./draw";
import { DOT_SIZE, Join, JoinPointer, Line, PADDING, SPACE } from "./constants";

let board = {};

const canvas = document.getElementById("input") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const joins: { [key: string]: Join } = {};
const lines: Set<Line> = new Set();
const path: Set<Line> = new Set();

ctx.lineWidth = 1;

// HARDCODE JOINS
for (let x = 0; x <= 4; x++) {
  for (let y = 0; y <= 4; y++) {
    joins[`${x},${y}`] = {
      x,
      y,
      lines: new Set(),
    };
  }
}

const findJoin = ({ x, y }: JoinPointer): Join | null => {
  if (joins[`${x},${y}`] != null) {
    return joins[`${x},${y}`];
  } else {
    return null;
  }
};

// HC LINES
for (let [key, join] of Object.entries(joins)) {
  const { x, y } = join;
  const nextLines = [findJoin({ x: x + 1, y }), findJoin({ x, y: y + 1 })];
  for (let nextLine of nextLines) {
    if (nextLine == null) {
      continue;
    }
    const line = {
      from: join,
      to: nextLine,
    };
    lines.add(line);
    join.lines.add(line);
    nextLine.lines.add(line);
  }
}

const START = findJoin({ x: 2, y: 2 });
const END = findJoin({ x: 4, y: 0 });

const getOtherJoinInLine = (line: Line, join: Join): Join => {
  if (join !== line.from && join !== line.to) {
    alert(12);
    throw "nooo";
  }

  if (join === line.from) {
    return line.to;
  }
  if (join === line.to) {
    return line.from;
  }
};

const getNextLine = (join: Join) => {
  let taken: Join[] = [];
  path.forEach((line) => {
    taken.push(line.from);
    taken.push(line.to);
  });
  taken = taken.filter((j) => j !== join);

  const lines = [...join.lines]
    .filter((line) => !path.has(line))
    .filter((line) => {
      if (taken.includes(line.from)) {
        return false;
      }
      if (taken.includes(line.to)) {
        return false;
      }
      return true;
    });
  let line = lines[0];
  if (line == null) {
    return;
  }
  return line;
};

let next = START;
for (let x = 0; x <= 12; x++) {
  let line = getNextLine(next);
  path.add(line);
  try {
    next = getOtherJoinInLine(line, next);
  } catch (e) {
    break;
  }
  if (!next) {
    break;
  }
}

// DRAW LINES
for (let line of lines) {
  drawLine(ctx, line);
}
for (let [_, join] of Object.entries(joins)) {
  drawDot(ctx, join);
}
ctx.fillStyle = "blue";
drawDot(ctx, START);
ctx.fillStyle = "yellow";
drawDot(ctx, END);

ctx.strokeStyle = "lime";
for (let line of path) {
  drawLine(ctx, line);
}
