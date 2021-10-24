import { Board } from "../constants";
import { drawLine, drawDot } from "./helpers";

export const getCanvas = (id: number | string): HTMLCanvasElement => {
  let canvas = document.getElementById(`cv-${id}`) as HTMLCanvasElement;
  if (canvas) {
    return canvas;
  }
  canvas = document.createElement("canvas");
  document.querySelector("x-canvas").appendChild(canvas);
  canvas.width = 400;
  canvas.height = 400;
  return canvas;
};

export const drawBoard = (board: Board) => {
  const ctx = getCanvas(Math.random()).getContext("2d");
  drawBoardAt(ctx, board);
};

export const drawBoardAt = (
  ctx: CanvasRenderingContext2D,
  { lines, joins, start, end, path }: Board
) => {
  ctx.clearRect(0, 0, 400, 400);
  // DRAW LINES
  for (let line of lines) {
    drawLine(ctx, "black", line);
  }
  for (let [_, join] of Object.entries(joins)) {
    drawDot(ctx, join);
  }
  ctx.fillStyle = "blue";
  drawDot(ctx, start);
  ctx.fillStyle = "yellow";
  drawDot(ctx, end);

  ctx.lineWidth = 10;
  for (let line of path) {
    drawLine(ctx, "lime", line);
  }
  ctx.lineWidth = 1;
};
