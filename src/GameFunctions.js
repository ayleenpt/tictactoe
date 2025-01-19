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

export function getFirstMove(squares, opponent) {
  if (opponent === "X") {
    if (squares[4]) return [0, 2, 6, 8][Math.floor(Math.random() * 4)];
    else return 4;
  }
}

export function win(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === "O" && squares[b] === "O" && squares[c] !== "X" ) {
      // status = `Winning path: ${winPaths[i]} - O O _`;
      return c;
    }
    if ( squares[b] === "O" && squares[c] === "O" && squares[a] !== "X" ) {
      // status = `Winning path: ${winPaths[i]} - _ O O`;
      return a;
    }
    if ( squares[c] === "O" && squares[a] === "O" && squares[b] !== "X" ) {
      // status = `Winning path: ${winPaths[i]} - O _ O`;
      return b;
    }
  }
  return null
}

export function block(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === "X" && squares[b] === "X" && squares[c] !== "O" ) {
      // status = `Blocking path: ${winPaths[i]} - X X _`;
      return c;
    }
    if ( squares[b] === "X" && squares[c] === "X" && squares[a] !== "O" ) {
      // status = `Blocking path: ${winPaths[i]} - _ X X`;
      return a;
    }
    if ( squares[c] === "X" && squares[a] === "X" && squares[b] !== "O" ) {
      // status = `Blocking path: ${winPaths[i]} - X _ X`;
      return b;
    }
  }
  // status = "no block or win found"
  return null;
}

export function getNextMove(squares) {

}

export function isBoardFull(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null || 'undefined' === typeof squares[i]) return false;
  }
  return true;
}

export function calculateWinner(squares) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return winPaths[i];
    }
  }
  return null;
}
