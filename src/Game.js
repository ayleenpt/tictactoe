import { useState, useEffect } from 'react';
import Square from './Square';
import { 
  getFirstMove, 
  win, 
  block, 
  isBoardFull, 
  calculateWinner 
} from './GameFunctions'

function Game() {
  const [usersTurn, setUsersTurn] = useState(true);
  const [firstMove, setFirstMove] = useState(true);
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
    setFirstMove(true);
  }

  function computersTurn() {
    if (usersTurn || winner) return;

    let chosenSpace;

    // first move, decide sequence to win or draw based on users first move
    if (firstMove) {
      chosenSpace = getFirstMove(squares);
      setFirstMove(false);
    }

    // if it's not the first move, try to win
    if (!chosenSpace) chosenSpace = win(squares);

    // try to block X if O can not win
    if (!chosenSpace) chosenSpace = block(squares);

    // if no need to block X, try to get two in a row
    if (!chosenSpace) console.log("get 2 in a row");

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

  return (
    <div className="board">
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

export default Game;