import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          active={i === this.props.active}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    renderBoard() {
      return [0, 1, 2].map((i) => (
        <div className="board-row">
          {[0, 1, 2].map((j) => this.renderSquare(3 * i + j))}
        </div>
      ));
    }
  
    render() {
       return <div>{this.renderBoard()}</div>;
    }
  }

  export default Board;