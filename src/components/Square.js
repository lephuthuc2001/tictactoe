import React from "react";

function Square({ handleClick, index, children }) {
  return (
    <button
      onClick={() => {
        handleClick(index);
      }}
      className={"square"}
    >
      {children}
    </button>
  );
}

export default Square;
