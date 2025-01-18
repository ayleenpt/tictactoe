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

export function getFirstMove(squares) {
  const xMove = squares.indexOf("X");

  // if x is in the center, start in the corner
  if (xMove === 4) {
    // status = "x in center, start in corner"
    const corners = [0, 2, 6, 8];
    return corners[Math.floor(Math.random() * 4)];

  // if x is in a corner, start in the center
  } else if (xMove === 0 || xMove === 2 || xMove === 6 || xMove === 8) {
    // status = "x in corner, start in center"
    return 4;
  
  // if x is on an edge that isn't a corner, start in the center
  } else {
    // status = "x on edge, start in center"
    return 4;
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
      return squares[a];
    }
  }
  return null;
}
