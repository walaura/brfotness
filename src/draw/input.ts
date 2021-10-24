import { drawLine } from "./helpers";
import {
  InputBoardWithJoinsAndLines,
  Join,
  JoinPointer,
  Line,
  Lines,
  PADDING,
  SPACE,
} from "../constants";
import { InputBoard } from "../constants";
import { getCanvas, drawBoardAt } from "./board";
import { toggleLineOnBoard } from "../board/setup";

export const startInput = (
  board: InputBoardWithJoinsAndLines,
  onUpdate: (board: InputBoardWithJoinsAndLines) => void
) => {
  const { joins, start, end } = board;

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
  $input.addEventListener("click", (ev) => {
    if (!ghostLine) {
      return;
    }
    board = toggleLineOnBoard(board, ghostLine);
    onUpdate(board);
  });
  document.querySelector("x-input").appendChild($input);
  const draw = () => {
    drawBoardAt(ctx, {
      lines: board.lines,
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
