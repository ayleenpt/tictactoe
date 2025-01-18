import { useState, useEffect } from 'react';
import One from './assets/base/one.png';
import Two from './assets/base/two.png';
import Three from './assets/base/three.png';
import Four from './assets/base/four.png';
import Five from './assets/base/five.png';
import Six from './assets/base/six.png';
import Seven from './assets/base/seven.png';
import Eight from './assets/base/eight.png';
import Nine from './assets/base/nine.png';
import OneX from './assets/x/x_one.png';
import TwoX from './assets/x/x_two.png';
import ThreeX from './assets/x/x_three.png';
import FourX from './assets/x/x_four.png';
import FiveX from './assets/x/x_five.png';
import SixX from './assets/x/x_six.png';
import SevenX from './assets/x/x_seven.png';
import EightX from './assets/x/x_eight.png';
import NineX from './assets/x/x_nine.png';
import OneO from './assets/o/o_one.png';
import TwoO from './assets/o/o_two.png';
import ThreeO from './assets/o/o_three.png';
import FourO from './assets/o/o_four.png';
import FiveO from './assets/o/o_five.png';
import SixO from './assets/o/o_six.png';
import SevenO from './assets/o/o_seven.png';
import EightO from './assets/o/o_eight.png';
import NineO from './assets/o/o_nine.png';



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

const backgrounds = [
  One, Two, Three, Four, Five, Six, Seven, Eight, Nine
]

const Xs = [
  OneX, TwoX, ThreeX, FourX, FiveX, SixX, SevenX, EightX, NineX
]

const Os = [
  OneO, TwoO, ThreeO, FourO, FiveO, SixO, SevenO, EightO, NineO
]

let status;

function Square ({ index, value, onSquareClick }) {
  let background = backgrounds[index];
  if (value === "X") background = Xs[index];
  if (value === "O") background = Os[index];
  return (
    <div
      className={'square'}
      onClick={onSquareClick}
    >
      <img src={background} alt="glass" className="square-bg"/>
    </div>
  );
}

function Game() {
  const [usersTurn, setUsersTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const full = isBoardFull(squares);
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (!usersTurn || squares[i] || winner) return;
    const newSquares = [...squares]; 
    newSquares[i] = "X";
    setSquares(newSquares);
    setUsersTurn(false);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setUsersTurn(true);
  }

  function computersTurn() {
    if (usersTurn || winner) return;

    let chosenSpace = win(squares);

    // try to block X if O can not win
    if (!chosenSpace) chosenSpace = block(squares);

    // get random space if there is no way to win or block X
    if (!chosenSpace) {
      let availableSpaces = squares
      .map((value, index) => (value === undefined || value === null ? index : null))
      .filter(index => index !== null);
      chosenSpace = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    }

    const newSquares = [...squares];
    newSquares[chosenSpace] = "O";
    setSquares(newSquares);
    setUsersTurn(true);
  }

  useEffect(() => {
    if (!usersTurn && !winner && !full) {
      const timer = setTimeout(() => {
        computersTurn();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [usersTurn, squares, winner, full]);

  if (winner) status = "Winner: " + winner;

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square index={0} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square index={1} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square index={2} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square index={3} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square index={4} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square index={5} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square index={6} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square index={7} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square index={8} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      { (winner || full) && (
        <button className="restart" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
}

function win(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === "O" && squares[b] === "O" && squares[c] !== "X" ) {
      status = `Winning path: ${winPaths[i]} - O O _`;
      return c;
    }
    if ( squares[b] === "O" && squares[c] === "O" && squares[a] !== "X" ) {
      status = `Winning path: ${winPaths[i]} - _ O O`;
      return a;
    }
    if ( squares[c] === "O" && squares[a] === "O" && squares[b] !== "X" ) {
      status = `Winning path: ${winPaths[i]} - O _ O`;
      return b;
    }
  }
  return null
}

function block(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === "X" && squares[b] === "X" && squares[c] !== "O" ) {
      status = `Blocking path: ${winPaths[i]} - X X _`;
      return c;
    }
    if ( squares[b] === "X" && squares[c] === "X" && squares[a] !== "O" ) {
      status = `Blocking path: ${winPaths[i]} - _ X X`;
      return a;
    }
    if ( squares[c] === "X" && squares[a] === "X" && squares[b] !== "O" ) {
      status = `Blocking path: ${winPaths[i]} - X _ X`;
      return b;
    }
  }
  status = "no block or win found"
  return null;
}

function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null || 'undefined' === typeof squares[i]) return false;
  }
  return true;
}

function calculateWinner(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;