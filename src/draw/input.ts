import { InputBoard } from "../constants";
import { getCanvas, drawBoardAt } from "./board";

export const startInput = () => {
  const { joins, lines, start, end } = globalThis.input as InputBoard;
  const $input = getCanvas("input");
  const ctx = $input.getContext("2d");
  let mouseIn = false;
  let ghostLine = null;
  $input.addEventListener("mousemove", (ev) => {
    //console.log(ev);
  });
  $input.addEventListener("mouseenter", (ev) => {
    mouseIn = true;
    requestAnimationFrame(draw);
  });
  $input.addEventListener("mouseleave", (ev) => {
    mouseIn = false;
  });
  document.querySelector("x-input").appendChild($input);
  const draw = () => {
    console.log("drawing");
    drawBoardAt(ctx, {
      lines,
      joins,
      path: new Set(),
      start,
      end,
    });
    if (mouseIn) {
      requestAnimationFrame(draw);
    }
  };
  requestAnimationFrame(draw);
};
