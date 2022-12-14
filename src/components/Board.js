import React from "react";
import Square from "./Square";

export default function Board(props) {
  return (
    <div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <Square
            value={props.squares[0]}
            onClick={() => {
              props.onClick(0);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[1]}
            onClick={() => {
              props.onClick(1);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[2]}
            onClick={() => {
              props.onClick(2);
            }}
            winner={props.winner}
          />
        </div>
        <div className="flex gap-x-2">
          <Square
            value={props.squares[3]}
            onClick={() => {
              props.onClick(3);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[4]}
            onClick={() => {
              props.onClick(4);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[5]}
            onClick={() => {
              props.onClick(5);
            }}
            winner={props.winner}
          />
        </div>
        <div className="flex gap-x-2">
          <Square
            value={props.squares[6]}
            onClick={() => {
              props.onClick(6);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[7]}
            onClick={() => {
              props.onClick(7);
            }}
            winner={props.winner}
          />
          <Square
            value={props.squares[8]}
            onClick={() => {
              props.onClick(8);
            }}
            winner={props.winner}
          />
        </div>
      </div>
    </div>
  );
}
