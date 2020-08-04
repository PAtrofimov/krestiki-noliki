import React from "react";

function Square(props) {
    const activePrefix = props.active ? " square-active" : "";
    const brushWins = props.brush ? " win-cell": "";
    return (
      <button className={"square" + activePrefix + brushWins} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square;