import React from "react";
import Board from "./Board";

function whoWins(squares) {
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
      return { winner: squares[a], winLine: winLines[i] };
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

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: new Array(9).fill(null), active: undefined }],
      xIsNext: true,
      stepNumber: 0,
      desc: false,
    };
  }

  handleClick(i) {
    const { history: h, xIsNext, stepNumber } = this.state;
    const history = h.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (whoWins(squares) || squares[i]) {
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

  sortbyDesc() {
    this.setState({
      desc: !this.state.desc,
    });
  }

  isDraw() {
    const { history: h, stepNumber } = this.state;
    const history = h.slice(0, stepNumber + 1);
    return history[history.length - 1].squares.every((it) => {
      return it;
    });
  }

  render() {
    const { history, xIsNext, stepNumber, desc } = this.state;
    const current = history[stepNumber];
    let status, statusValue;
    const param = whoWins(current.squares);
    const winner = param?.winner;
    const winLine = param?.winLine;

    if (winner) {
      status = "The winner:";
      statusValue = `${winner}`;
    } else if (this.isDraw()) {
      status = "This is the draw!";
    } else {
      status = "Next player:";
      statusValue = `${xIsNext ? "X" : "O"}`;
    }

    const moves = (desc ? [...history].reverse() : history).map(
      (step, move) => {
        const active = activeCell(step.active);
        const activeCellText = active ? `(${active.row}, ${active.col})` : "";
        const position = desc ? history.length - 1 - move : move;
        const caption = position
          ? `Go to step #${position} ${activeCellText}`
          : "Go to start";

        return (
          <li key={position}>
            <button
              onClick={() => {
                this.jumpTo(position);
              }}
            >
              {caption}{" "}
            </button>
          </li>
        );
      }
    );

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winLine={winLine}
            active={current.active}
            onClick={(i) => {
              this.handleClick(i);
            }}
          />
        </div>
        <div className="game-info">
          <div>
            <span className="game-history-status">{status}</span>
            <span className="game-history-status-value">{statusValue}</span>
          </div>
          <div className="game-history">
            <p className="game-history-title">History</p>
            <button
              onClick={() => {
                this.sortbyDesc();
              }}
              className="game-history-btn"
            >
              {desc ? "\u25bc" : "\u25b2"}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
