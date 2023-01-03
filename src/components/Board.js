import React from "react";
import Square from "./Square";

export default function Board({ squares, handleClick }) {
  const array = [];
  for (let i = 0; i < squares.length; i++) {
    array.push(
      <Square
        key={Math.random().toString(36).substring(7)}
        handleClick={handleClick}
        index={i}
      >
        {squares[i]}
      </Square>
    );
  }

  return (
    <div className="board">
      <div>
        <div className="board-row">{array.slice(0, 3)}</div>
        <div className="board-row">{array.slice(3, 6)}</div>
        <div className="board-row">{array.slice(6)}</div>
      </div>
    </div>
  );
}
