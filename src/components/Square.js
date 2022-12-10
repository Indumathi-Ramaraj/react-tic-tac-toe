import React from "react";

export default function Square(props) {
  return (
    <button
      className="w-28 h-28 bg-gradient-to-r gap-x-2 gap-y-2 bg-white  hover:from-pink-400 hover:to-yellow-300  text-base cursor-pointer shadow-lg rounded-lg border-4 border-sky-700 "
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
