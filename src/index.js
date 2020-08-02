import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  const activePrefix = props.active ? "square-active" : "";
  return (
    <button className={"square " + activePrefix} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function activeCell(i) {
  if (i !== undefined) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (3 * row + col === i) {
          return { row, col };
        }
      }
    }
  }

  return null;
}

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
    console.log(this.renderBoard());
    return <div>{this.renderBoard()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: new Array(9).fill(null), active: undefined }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const { history: h, xIsNext, stepNumber } = this.state;
    const history = h.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares, active: i }]),
      xIsNext: !xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(stepNumber) {
    this.setState({
      stepNumber,
      xIsNext: stepNumber % 2 === 0,
    });
  }

  render() {
    const { history, xIsNext, stepNumber } = this.state;
    const current = history[stepNumber];
    let status;
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = `The winner: ${winner}`;
    } else {
      status = `Next player: ${xIsNext ? "X" : "O"}`;
    }

    const moves = history.map((step, move) => {
      const active = activeCell(step.active);
      const activeCellText = active ? `(${active.row}, ${active.col})` : "";
      const desc = move
        ? `Go to step #${move} ${activeCellText}`
        : "Go to start";

      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}{" "}
          </button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            active={current.active}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
