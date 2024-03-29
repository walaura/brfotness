import { DOT_SIZE, Join, Line, PADDING, SPACE } from "../constants";

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  color: string = "black",
  { points: [from, to] }: Line
) => {
  ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(
    DOT_SIZE - PADDING + (from.x + 1) * SPACE,
    DOT_SIZE - PADDING + (from.y + 1) * SPACE
  );
  ctx.lineTo(
    DOT_SIZE - PADDING + (to.x + 1) * SPACE,
    DOT_SIZE - PADDING + (to.y + 1) * SPACE
  );
  ctx.closePath();
  ctx.stroke();
};

export const drawDot = (ctx: CanvasRenderingContext2D, { x, y }: Join) => {
  ctx.fillRect(
    DOT_SIZE / 2 - PADDING + (x + 1) * SPACE,
    DOT_SIZE / 2 - PADDING + (y + 1) * SPACE,
    DOT_SIZE,
    DOT_SIZE
  );
};
