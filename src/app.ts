import { getBoard } from "./board/setup";
import { Join, Line } from "./constants";
import { drawBoard } from "./draw/board";
import { startInput } from "./draw/input";

let board = getBoard();

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

let paths: Path[] = getNextLines([], board.start).map((line) => {
  return {
    lines: [line],
    at: getOtherJoinInLine(line, board.start),
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
        isSolved: to === board.end,
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

startInput(board, (newBoard) => {
  board = newBoard;
  paths = getNextLines([], board.start).map((line) => {
    return {
      lines: [line],
      at: getOtherJoinInLine(line, board.start),
      isFinished: false,
      isSolved: false,
    };
  });
});

const draw = () => {
  document.querySelector("x-canvas").innerHTML = "";
  for (let path of paths.sort((a, b) => a.lines.length - b.lines.length)) {
    if (path.isSolved !== true) {
      continue;
    }
    console.log(path);
    drawBoard({
      lines: board.lines,
      joins: board.joins,
      path: new Set(path.lines),
      start: board.start,
      end: board.end,
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
