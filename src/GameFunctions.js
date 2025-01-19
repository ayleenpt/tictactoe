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

const triangles = [
  [0, 2, 6],
  [0, 6, 8],
  [2, 6, 8],
  [0, 2, 8]
]

export function playAsO(squares, self, opponent, firstMove) {
  if (firstMove) return squares[4] ? [0, 2, 6, 8][Math.floor(Math.random() * 4)] : 4;
  let chosenSpace = null;
  if (chosenSpace === null) chosenSpace = win(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = block(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = getPathOfTwo(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = getRandomMove(squares);
  return chosenSpace;
}

export function playAsX(squares, self, opponent, firstMove) {
  if (firstMove) return [0, 2, 6, 8][Math.floor(Math.random() * 4)];
  let chosenSpace = null;
  if (chosenSpace === null) chosenSpace = win(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = block(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = makeTriangle(squares, opponent, self);
  if (chosenSpace === null) chosenSpace = getRandomMove(squares);
  return chosenSpace;
}

export function win(squares, opponent, self) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === self && squares[b] === self && squares[c] !== opponent ) return c;
    if ( squares[b] === self && squares[c] === self && squares[a] !== opponent ) return a;
    if ( squares[c] === self && squares[a] === self && squares[b] !== opponent ) return b;
  }
  return null;
}

export function block(squares, opponent, self) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if ( squares[a] === opponent && squares[b] === opponent && squares[c] !== self ) return c;
    if ( squares[b] === opponent && squares[c] === opponent && squares[a] !== self ) return a;
    if ( squares[c] === opponent && squares[a] === opponent && squares[b] !== self ) return b;
  }
  return null;
}

export function getPathOfTwo(squares, opponent, self) {
  for (let i = 0; i < winPaths.length; i++) {
    const [a, b, c] = winPaths[i];
    if (squares[a] === self && squares[b] !== opponent && squares[c] !== opponent) return c;
    if (squares[b] === self && squares[c] !== opponent && squares[a] !== opponent) return c;
    if (squares[c] === self && squares[a] !== opponent && squares[b] !== opponent) return b;
  }
  return null;
}

export function makeTriangle(squares, opponent, self) {
  if (squares[4] === opponent) return null;
  for (let i = 0; i < 4; i++) {
    const [a, b, c] = triangles[i];
    if (squares[a] === self && squares[b] === self && squares[c] !== opponent) return c;
    if (squares[a] === self && squares[b] !== opponent && squares[c] === self) return b;
    if (squares[a] !== opponent && squares[b] === self && squares[c] === self) return a;
    if (squares[a] === self && squares[b] !== opponent && squares[c] !== opponent) return c;
    if (squares[a] !== opponent && squares[b] !== opponent && squares[c] === self) return b;
    if (squares[a] !== opponent && squares[b] === self && squares[c] !== opponent) return a;
  }
  return null;
}

export function getRandomMove(squares) {
  let availableSpaces = squares
  .map((value, index) => (value === undefined || value === null ? index : null))
  .filter(index => index !== null);
  return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
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
