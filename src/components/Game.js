import React, { useState, useEffect, useRef } from "react";
import Board from "./Board";
import History from "./History";
function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const [squaresTrack, setSquaresTrack] = useState([Array(9).fill(null)]);
  const [xIsNextTrack, setXIsNextTrack] = useState([true]);

  const [isCheckingHistory, setIsCheckingHistory] = useState(false);

  //Declaring a Winner
  useEffect(() => {
    if (calculateWinner(squares)) {
      setWinner(xIsNext ? "X" : "O");
    } else {
      setXIsNext(!xIsNext);
    }
    console.log(squaresTrack);
    console.log(xIsNextTrack);
  }, [squares]);

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    if (squares[i]) return;
    if (!isCheckingHistory) {
      if (!winner) {
        setSquares(() => {
          squares[i] = xIsNext ? "X" : "O";
          return [...squares];
        });

        setSquaresTrack((prev) => {
          return [...prev, [...squares]];
        });

        setXIsNextTrack((prev) => {
          return [...prev, xIsNext];
        });
      }
    } else {
      const currentMove = squares.filter((square) => square !== null).length;
      setSquaresTrack((prev) => {
        return [...prev.slice(0, currentMove + 1)];
      });

      setXIsNextTrack((prev) => {
        return [...prev.slice(0, currentMove + 1)];
      });
      setIsCheckingHistory(false);
      setWinner(null);

      setSquares(() => {
        squares[i] = xIsNext ? "X" : "O";
        return [...squares];
      });

      setSquaresTrack((prev) => {
        return [...prev, [...squares]];
      });

      setXIsNextTrack((prev) => {
        return [...prev, xIsNext];
      });
    }
  };

  //Restart game
  const handlRestart = () => {
    console.log(squaresTrack);
    setXIsNext(true);
    setWinner(null);
    setSquares(Array(9).fill(null));
    setSquaresTrack([Array(9).fill(null)]);
    setXIsNextTrack([true]);
  };

  //GO to move

  const goToMove = (i) => {
    setSquares([...squaresTrack[i]]);
    setXIsNext(xIsNextTrack[i]);
  };

  //Check history
  const checkHistoryHandler = () => {
    setIsCheckingHistory(true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="core-section">
        <div className="game">
          <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
          <Board squares={squares} handleClick={handleClick} />
        </div>
        <History
          squaresTrack={squaresTrack}
          goToMove={goToMove}
          onCheckHistory={checkHistoryHandler}
        />
      </div>

      <button onClick={handlRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
