import { useState, useEffect } from 'react';
import Square from './Square';
import { 
  playAsO, 
  playAsX, 
  isBoardFull, 
  calculateWinner 
} from './GameFunctions'

let status;

function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [usersTurn, setUsersTurn] = useState(null);
  const [firstMove, setFirstMove] = useState(true);
  const [playerPawn, setPlayerPawn] = useState(null);
  const [computerPawn, setComputerPawn] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showReplay, setShowReplay] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const full = isBoardFull(squares);
  const winner = calculateWinner(squares);

  function setPawn(pawn) {
    setPlayerPawn(pawn);
    setComputerPawn(pawn === "X" ? "O" : "X");
    setUsersTurn(pawn === "X" ? true : false);
    setGameStarted(true);
  }

  function playersTurn(chosenSpace) {
    status = "user: " + playerPawn + " | computer: " + computerPawn;
    if (!usersTurn || squares[chosenSpace] || winner || !gameStarted) return;
    endTurn(chosenSpace, playerPawn);
  }

  function computersTurn() {
    status = "user: " + playerPawn + " | computer: " + computerPawn;
    if (usersTurn || winner || !gameStarted) return;

    let chosenSpace;
    if (computerPawn == "O") chosenSpace = playAsO(squares, computerPawn, playerPawn, firstMove);
    else chosenSpace = playAsX(squares, computerPawn, playerPawn, firstMove);
    if (firstMove) setFirstMove(false);

    endTurn(chosenSpace, computerPawn);
  }

  function endTurn(chosenSpace, pawn) {
    const newSquares = [...squares];
    newSquares[chosenSpace] = pawn;
    setSquares(newSquares);
    setUsersTurn(!usersTurn);
  }

  function setWinner() {
    setGameOver(true);
    const newSquares = Array(9).fill(null);
    for (let i = 0; i < 3; i++) newSquares[winner[i]] = squares[winner[i]];
    setSquares(newSquares);
  }

  function handleReplay() {
    setSquares(Array(9).fill(null));
    setUsersTurn(null);
    setFirstMove(true);
    setShowReplay(false);
    setGameStarted(false);
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
        if (winner) setWinner();
        setShowReplay(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [winner, full]);

  return (
    <div className="board">
      <div>
        { !gameStarted && (
          <div  className="pawn-choice">
            <button className="choice choose-x" onClick={() => setPawn("X")}>X</button>
            <button className="choice choose-o" onClick={() => setPawn("O")}>O</button>
          </div>
        )}
      </div>
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
      { (winner || full) && showReplay && (
        <button className="replay" onClick={handleReplay}>
          replay
        </button>
      )}
    </div>
  );
}

export default Game;
