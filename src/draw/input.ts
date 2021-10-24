import { drawLine } from "./helpers";
import {
  InputBoardWithJoinsAndLines,
  Join,
  JoinPointer,
  Line,
  PADDING,
  SPACE,
} from "./../constants";
import { InputBoard } from "../constants";
import { getCanvas, drawBoardAt } from "./board";

export const startInput = (board: InputBoardWithJoinsAndLines) => {
  const { joins, lines, start, end } = board;

  const findJoin = ({ x, y }: JoinPointer): Join | null => {
    if (joins[`${x},${y}`] != null) {
      return joins[`${x},${y}`];
    } else {
      return null;
    }
  };

  const $input = getCanvas("input");
  const ctx = $input.getContext("2d");
  let ghostLine: Line = null;
  $input.addEventListener("mousemove", (ev) => {
    const [rawX, rawY] = [
      (ev.offsetX - PADDING) / SPACE - 0.0,
      (ev.offsetY - PADDING) / SPACE - 0.0,
    ];
    const [x, y] = [rawX, rawY].map(Math.floor);
    let points;
    if (rawX - x > rawY - y) {
      points = [findJoin({ x, y }), findJoin({ x: x + 1, y })];
    } else {
      points = [findJoin({ x, y }), findJoin({ x, y: y + 1 })];
    }
    if (!points.includes(null)) {
      ghostLine = {
        points,
      };
    }
  });
  document.querySelector("x-input").appendChild($input);
  const draw = () => {
    drawBoardAt(ctx, {
      lines,
      joins,
      path: new Set(),
      start,
      end,
    });

    if (ghostLine) {
      drawLine(ctx, "blue", ghostLine);
    }
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
};
