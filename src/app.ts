let board = {};

const canvas = document.getElementById("input") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const SPACE = 60;
const DOT_SIZE = 10;
const PADDING = 30;

type JoinPointer = {
  x: number;
  y: number;
};

type Join = JoinPointer & {
  lines: Set<Line>;
};

type Line = {
  from: Join;
  to: Join;
};

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

// DRAW LINES
for (let line of lines) {
  const { from, to } = line;
  ctx.beginPath();
  ctx.moveTo(
    DOT_SIZE - PADDING + (from.x + 1) * SPACE,
    DOT_SIZE - PADDING + (from.y + 1) * SPACE
  );
  ctx.lineTo(
    DOT_SIZE - PADDING + (to.x + 1) * SPACE,
    DOT_SIZE - PADDING + (to.y + 1) * SPACE
  );
  ctx.stroke();
}
// JOINS
for (let [_, join] of Object.entries(joins)) {
  const { x, y } = join;
  ctx.fillRect(
    DOT_SIZE / 2 - PADDING + (x + 1) * SPACE,
    DOT_SIZE / 2 - PADDING + (y + 1) * SPACE,
    DOT_SIZE,
    DOT_SIZE
  );
}

let { x, y } = START;
ctx.fillStyle = "blue";
ctx.fillRect(
  DOT_SIZE / 2 - PADDING + (x + 1) * SPACE,
  DOT_SIZE / 2 - PADDING + (y + 1) * SPACE,
  DOT_SIZE,
  DOT_SIZE
);

let { x, y } = END;
ctx.fillStyle = "yellow";
ctx.fillRect(
  DOT_SIZE / 2 - PADDING + (x + 1) * SPACE,
  DOT_SIZE / 2 - PADDING + (y + 1) * SPACE,
  DOT_SIZE,
  DOT_SIZE
);

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

ctx.fillStyle = "black";
let solved = false;

const getNextJoin = (join: Join): Join | null => {
  let taken: Join[] = [];
  path.forEach((line) => {
    taken.push(line.from);
    taken.push(line.to);
  });
  taken = taken.filter((j) => j !== join);

  const lines = [...join.lines]
    .filter((line) => !path.has(line))
    .filter((line) => {
      console.log(join, line);
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
  path.add(line);
  return getOtherJoinInLine(line, join);
};

let next = START;
for (let x = 0; x <= 12; x++) {
  next = getNextJoin(next);
  if (!next) {
    alert("done");
    x = 22;
  }
}

ctx.strokeStyle = "lime";
for (let line of path) {
  const { from, to } = line;
  ctx.beginPath();
  ctx.moveTo(
    DOT_SIZE - PADDING + (from.x + 1) * SPACE,
    DOT_SIZE - PADDING + (from.y + 1) * SPACE
  );
  ctx.lineTo(
    DOT_SIZE - PADDING + (to.x + 1) * SPACE,
    DOT_SIZE - PADDING + (to.y + 1) * SPACE
  );
  ctx.stroke();
}
