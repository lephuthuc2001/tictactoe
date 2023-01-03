import React from "react";

function History({ squaresTrack, goToMove, onCheckHistory }) {
  const arrayBtn = [];
  for (let i = 0; i < squaresTrack.length; i++) {
    arrayBtn.push(
      <div key={Math.random().toString(36).substring(5)}>
        <button
          onClick={() => {
            goToMove(i);
            onCheckHistory();
          }}
        >
          Back to {i === 0 ? "the start" : `move ${i}`}
        </button>
      </div>
    );
  }

  return (
    <ul className="history">
      <h4>History</h4>
      {arrayBtn}
    </ul>
  );
}

export default History;
