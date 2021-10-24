import { Join, Joins, JoinPointer, Line, Board, InputBoard } from "./constants";
import { drawBoard, drawBoardAt, getCanvas } from "./draw/board";
import { startInput } from "./draw/input";

const input: InputBoard = {
  joins: {},
  lines: new Set(),
};
declare module globalThis {
  let input: InputBoard;
}
globalThis.input = input;
const { joins, lines } = globalThis.input;

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
    if (join.x === 1 && join.y === 0 && nextLine.x === 1 && nextLine.y === 1) {
      continue;
    }
    if (join.x === 1 && join.y === 3 && nextLine.x === 1 && nextLine.y === 4) {
      continue;
    }
    const line: Line = {
      points: [join, nextLine],
    };
    lines.add(line);
    join.lines.add(line);
    nextLine.lines.add(line);
  }
}

globalThis.input.start = findJoin({ x: 2, y: 2 });
globalThis.input.end = findJoin({ x: 4, y: 0 });

const getOtherJoinInLine = (line: Line, join: Join): Join => {
  if (!line.points.includes(join)) {
    alert(12);
    throw "nooo";
  }
  return line.points.filter((point) => point != join)[0];
};

const getNextLines = (path: Line[], join: Join) => {
  let taken: Join[] = [];
  path.forEach((line) => {
    for (let point of line.points) {
      taken.push(point);
    }
  });
  taken = taken.filter((j) => j !== join);
  const lines = [...join.lines]
    .filter((line) => !path.includes(line))
    .filter((line) => {
      if (taken.some((takenPoint) => line.points.includes(takenPoint))) {
        return false;
      }
      return true;
    });
  return lines;
};

type Path = {
  lines: Line[];
  at: Join;
  isFinished: boolean;
  isSolved: boolean;
};

let paths: Path[] = getNextLines([], globalThis.input.start).map((line) => {
  return {
    lines: [line],
    at: getOtherJoinInLine(line, globalThis.input.start),
    isFinished: false,
    isSolved: false,
  };
});
const loop = () => {
  const nextPaths = [];
  for (let path of paths) {
    if (path.isFinished) {
      nextPaths.push(path);
      continue;
    }
    if (path.isSolved) {
      nextPaths.push(path);
      continue;
    }
    let lines = getNextLines(path.lines, path.at);
    if (lines.length === 0) {
      nextPaths.push({
        ...path,
        isFinished: true,
        isSolved: false,
      });
      continue;
    }

    for (let line of lines) {
      const to = getOtherJoinInLine(line, path.at);
      nextPaths.push({
        lines: [...path.lines, line],
        at: to,
        isFinished: false,
        isSolved: to === globalThis.input.end,
      });
    }
  }

  const tbd =
    nextPaths.length -
    nextPaths.filter((p) => p.isFinished || p.isSolved).length;

  console.log(`${nextPaths.length} paths total`);
  console.log(`${tbd} paths TBD`);
  console.log(`${nextPaths.filter((p) => p.isFinished).length} finished paths`);
  console.log(`${nextPaths.filter((p) => p.isSolved).length} solved paths`);
  console.log(`${100 - (tbd / nextPaths.length) * 100}% solved`);

  paths = nextPaths;
};

startInput();

const draw = () => {
  document.querySelector("x-canvas").innerHTML = "";
  for (let path of paths.sort((a, b) => a.lines.length - b.lines.length)) {
    if (path.isSolved !== true) {
      continue;
    }
    console.log(path);
    drawBoard({
      lines,
      joins,
      path: new Set(path.lines),
      start: globalThis.input.start,
      end: globalThis.input.end,
    });
  }
};

const $next = document.createElement("button");
$next.innerText = "next";
$next.onclick = () => {
  loop();
};
document.querySelector("x-tools").appendChild($next);

const $draw = document.createElement("button");
$draw.innerText = "draw";
$draw.onclick = () => {
  draw();
};
document.querySelector("x-tools").appendChild($draw);
