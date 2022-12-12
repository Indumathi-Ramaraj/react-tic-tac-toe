import React from "react";
import letterX from "../../src/letterX.png";
import letterO from "../../src/letterO.png";

export default function Square(props) {
 
  const sqaure =
    props.value === null ? null : props.value === "X" ? (
      <img src={letterX} />
    ) : (
      <img src={letterO} />
    );
  return (
    <button
      className="w-28 h-28 bg-gradient-to-r gap-x-2 gap-y-2 bg-white  hover:bg-pink-200  text-base cursor-pointer shadow-lg rounded-lg border-4 border-sky-700 "
      onClick={props.onClick}
    >
      {sqaure}
    </button>
  );
}
