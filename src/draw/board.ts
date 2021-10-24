import { Board } from "../constants";
import { drawLine, drawDot } from "./helpers";

const getCanvas = (): CanvasRenderingContext2D => {
  const canvas = document.createElement("canvas");
  document.querySelector("x-canvas").appendChild(canvas);
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  return ctx;
};

export const drawBoard = ({ lines, joins, start, end, path }: Board) => {
  const ctx = getCanvas();
  // DRAW LINES
  for (let line of lines) {
    drawLine(ctx, line);
  }
  for (let [_, join] of Object.entries(joins)) {
    drawDot(ctx, join);
  }
  ctx.fillStyle = "blue";
  drawDot(ctx, start);
  ctx.fillStyle = "yellow";
  drawDot(ctx, end);

  ctx.strokeStyle = "lime";
  ctx.lineWidth = 10;

  for (let line of path) {
    drawLine(ctx, line);
  }
};
