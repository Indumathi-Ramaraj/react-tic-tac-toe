import React, { useReducer } from "react";
import Board from "./Board";

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return {
        xIsNext: true,
        history: [{ squares: Array(9).fill(null) }],
      };

    case "MOVE":
      return {
        ...state,
        history: state.history.concat({
          squares: action.payload.squares,
        }),
        xIsNext: !state.xIsNext,
      };

    case "BACK":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.slice(0, action.payload + 1),
      };
    case "FORWARD":
      return {
        ...state,
        xIsNext: action.payload.step % 2 === 0,
        history: state.history.concat(action.payload.squares),
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

  const handleClick = (i) => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    dispatch({ type: "MOVE", payload: { squares } });
  };

  const current = history[history.length - 1];

  const winner = calculateWinner(current.squares);

  const status = winner
    ? winner === "D"
      ? "Draw"
      : "Winner is " + winner
    : state.history.length === 1
    ? "First player is X"
    : "Next player is " + [xIsNext ? "X" : "O"];

  const moveBack = history.length - 2;

  return (
    <div className="h-screen flex  justify-center items-center bg-blue-200 gap-y-20">
      <div className="flex flex-col gap-y-12">
        <div className="text-6xl font-bold  text-blue-700 ">
          Tic - Tac - Toe
        </div>
        <div className="flex gap-x-10 md:flex-row md:flex flex-col">
          <Board
            squares={current.squares}
            onClick={(i) => {
              handleClick(i);
            }}
            winner={winner}
          />
          <div className="flex mt-10 md:mt-4 gap-x-4 justify-center ">
            <div className="font-medium text-xl italic ">{status}</div>
            {state.history.length === 1 && (
              <div className="underline text-xl font-medium">Start the Game</div>
            )}

            {!winner && state.history.length !== 1 && (
              <div
                className="h-8 w-16 border-2 border-gray-600 rounded-lg shadow-lg px-2 bg-slate-100 cursor-pointer "
                onClick={() => {
                  dispatch({ type: "BACK", payload: moveBack });
                }}
              >
                Undo
              </div>
            )}

            {winner && (
              <div
                className="h-8 border-2 border-gray-600 rounded-lg shadow-lg px-2 bg-slate-100 text-wrap"
                onClick={() => {
                  dispatch({ type: "NEW" });
                }}
              >
                Start the New Game
              </div>
            )}
          </div>
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
