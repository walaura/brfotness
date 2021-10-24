import { Join, Joins, JoinPointer, Line, Board } from "./constants";
import { drawBoard } from "./draw/board";

const joins: Joins = {};
const lines: Set<Line> = new Set();

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

const getNextLines = (path: Line[], join: Join) => {
  let taken: Join[] = [];
  path.forEach((line) => {
    taken.push(line.from);
    taken.push(line.to);
  });
  taken = taken.filter((j) => j !== join);
  const lines = [...join.lines]
    .filter((line) => !path.includes(line))
    .filter((line) => {
      if (taken.includes(line.from)) {
        return false;
      }
      if (taken.includes(line.to)) {
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

let paths: Path[] = getNextLines([], START).map((line) => {
  return {
    lines: [line],
    at: getOtherJoinInLine(line, START),
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
        isSolved: to === END,
      });
    }
  }

  console.log(`${nextPaths.length} paths total`);
  console.log(
    `${
      nextPaths.length -
      nextPaths.filter((p) => p.isFinished || p.isSolved).length
    } paths TBD`
  );
  console.log(`${nextPaths.filter((p) => p.isFinished).length} finished paths`);
  console.log(`${nextPaths.filter((p) => p.isSolved).length} solved paths`);

  paths = nextPaths;
};

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
      start: START,
      end: END,
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
