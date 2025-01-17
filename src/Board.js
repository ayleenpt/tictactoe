import {useState} from 'react';
import Glass from './glass.png';
import X from './x.png';
import O from './o.png';

function Square ({ className, value, onSquareClick }) {
  let glass = Glass;
  if (value === "X") glass = X;
  if (value === "O") glass = O;
  return (
    <div
      className={`square ${className}`}
      onClick={onSquareClick}
    >
      <img src={glass} className="glass"/>
    </div>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const full = isBoardFull(squares);
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice(); // Create a new array to avoid mutating state directly
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null)); // Reset the squares
    setXIsNext(true); // Reset the turn to X
  }

  let status;
  if (winner) status = "Winner: " + winner;

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square className="three" value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square className="one" value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square className="four" value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square className="five" value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square className="two" value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square className="three" value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square className="two" value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square className="four" value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square className="six" value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      { (winner || full) && (
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null || 'undefined' === typeof squares[i]) return false;
  }
  return true;
}

function calculateWinner(squares) {
  const winPaths = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;