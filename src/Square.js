import React from "react";

function Square(props) {
    const activePrefix = props.active ? "square-active" : "";
    return (
      <button className={"square " + activePrefix} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square;