import React, { useState } from "react";
import letterX from "../../src/letterX.png";
import letterO from "../../src/letterO.png";

export default function Square(props) {
  const sqaure =
    props.value === null ? null : props.value === "X" ? (
      <img src={letterX} alt="X" />
    ) : (
      <img src={letterO} alt="O" />
    );
  const [status, setStatus] = useState(false);

  return (
    <div onClick={() => (props.winner ? setStatus(true) : setStatus(false))}>
      <button
        className={`w-28 h-28 bg-gradient-to-r gap-x-2 gap-y-2 text-base shadow-lg rounded-lg border-4 border-blue-600 ${
          props.winner
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-slate-100 hover:bg-pink-200 cursor-pointer"
        }`}
        onClick={props.onClick}
      >
        {sqaure}
        {props.winner && status && (
          <div
            role="tooltip"
            className="z-20 bg-slate-300  w-24  absolute transition duration-150 ease-in-out shadow-lg  py-2 px-0 rounded-lg"
          >
            <p className="text-sm text-red-500 font-medium">{`${props.winner} is winner`}</p>
          </div>
        )}
      </button>
    </div>
  );
}
