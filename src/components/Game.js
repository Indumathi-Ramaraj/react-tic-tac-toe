import React, { useReducer } from "react";
import Board from "./Board";

const reducer = (state, action) => {
  switch (action.type) {
    case "JUMP":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload.step + 1),
      };
    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };
    default:
      return state;
  }
};

export default function Game() {
  const [state, dispatch] = useReducer(reducer, {
    xIsNext: true,
    history: [{ squares: Array(9).fill(null) }],
  });

  const { xIsNext, history } = state;

  const jumpTo = (step) => {
    dispatch({ type: "JUMP", payload: { step } });
  };

  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log("Square..", squares);

    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    //squares[i] = xIsNext ? ;

    squares[i] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };

  const current = history[history.length - 1];

  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === "D"
      ? "Draw"
      : "Winner is " + winner
    : "Next player is " + [xIsNext ? "X" : "O"];

  const moves = history.map((step, move) => {
    const desc = move ? "Go to step: " + move : "Start the Game";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div
      className={`${
        winner ? "cursor-not-allowed" : "cursor-pointer"
      } w-full h-screen bg-gradient-to-r bg-cyan-400  flex justify-center items-center`}
    >
      <div className="flex flex-col gap-y-6 ">
        <Board
          squares={current.squares}
          onClick={(i) => {
            handleClick(i);
          }}
        />

        <div className="flex gap-x-8">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const winnerLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let isDraw = true;
  for (let i = 0; i < winnerLines.length; i++) {
    const [a, b, c] = winnerLines[i];

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
    if (!squares[a] || !squares[b] || !squares[c]) {
      isDraw = false;
    }
  }
  if (isDraw) return "D";
  return null;
};
