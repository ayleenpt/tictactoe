import { useState, useEffect } from 'react';
import Square from './Square';
import { 
  getFirstMove, 
  win, 
  block, 
  isBoardFull, 
  calculateWinner 
} from './GameFunctions'

let status;

function Game() {
  const [usersTurn, setUsersTurn] = useState(true);
  const [firstMove, setFirstMove] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showRestart, setShowRestart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [userPawn, setuserPawn] = useState("X");
  const full = isBoardFull(squares);
  const winner = calculateWinner(squares);

  function playersTurn(i) {
    status = squares.toString();
    if (!usersTurn || squares[i] || winner) return;
    const newSquares = [...squares]; 
    newSquares[i] = "X";
    setSquares(newSquares);
    setUsersTurn(false);
    status = squares.toString();
  }

  function computersTurn() {
    status = squares.toString();
    if (usersTurn || winner) return;

    let chosenSpace;

    if (firstMove) {
      chosenSpace = getFirstMove(squares, userPawn);
      status = "chose first move: " + chosenSpace + " !";
      setFirstMove(false);
    }

    if (chosenSpace === -1) chosenSpace = win(squares);
    if (chosenSpace === -1) chosenSpace = block(squares);
    if (chosenSpace === -1) console.log("get 2 in a row");

    if (chosenSpace === -1) {
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

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setUsersTurn(true);
    setFirstMove(true);
    setShowRestart(false);
    setGameOver(false);
  }

  useEffect(() => {
    if (!usersTurn && !winner && !full) {
      const timer = setTimeout(() => {
        computersTurn();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [usersTurn, squares, winner, full]);

  useEffect(() => {
    if (winner || full) {
      const timer = setTimeout(() => {
        setShowRestart(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [winner, full]);

  function setWinner() {
    setGameOver(true);
    const newSquares = Array(9).fill(null);
    for (let i = 0; i < 3; i++) newSquares[winner[i]] = squares[winner[i]];
    setSquares(newSquares);
  }

  if (winner && !gameOver) {
    status = winner.toString();
    setWinner();
  }

  return (
    <div className="board">
      <div className="status">{status}</div>
      <div className="board-row">
        <Square index={0} value={squares[0]} onSquareClick={() => playersTurn(0)} />
        <Square index={1} value={squares[1]} onSquareClick={() => playersTurn(1)} />
        <Square index={2} value={squares[2]} onSquareClick={() => playersTurn(2)} />
      </div>
      <div className="board-row">
        <Square index={3} value={squares[3]} onSquareClick={() => playersTurn(3)} />
        <Square index={4} value={squares[4]} onSquareClick={() => playersTurn(4)} />
        <Square index={5} value={squares[5]} onSquareClick={() => playersTurn(5)} />
      </div>
      <div className="board-row">
        <Square index={6} value={squares[6]} onSquareClick={() => playersTurn(6)} />
        <Square index={7} value={squares[7]} onSquareClick={() => playersTurn(7)} />
        <Square index={8} value={squares[8]} onSquareClick={() => playersTurn(8)} />
      </div>
      { (winner || full) && showRestart && (
        <button className="restart" onClick={handleRestart}>
          restart
        </button>
      )}
    </div>
  );
}

export default Game;
