import boardIsCorrect from "./boardIsCorrect.js";
import emptyPositions from "./empyPositions.js";
import symbolPlay from "./symbolPlay.js";

const winningArrays = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6]             // diagonales
];

// Verifica si alguien ganó
function checkWinner(board) {
  for (let combo of winningArrays) {
    const [a, b, c] = combo;
    if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // 1 = X, 2 = O
    }
  }
  return null;
}

// Implementación minimax
function minimax(board, isMaximizing) {
  const winner = checkWinner(board);
  if (winner === 1) return 1;   // Gana X
  if (winner === 2) return -1;  // Gana O
  if (emptyPositions(board).length === 0) return 0; // Empate

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let index of emptyPositions(board)) {
      board[index] = 1; // Juega X
      let score = minimax(board, false);
      board[index] = 0;
      bestScore = Math.max(score, bestScore);
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let index of emptyPositions(board)) {
      board[index] = 2; // Juega O
      let score = minimax(board, true);
      board[index] = 0;
      bestScore = Math.min(score, bestScore);
    }
    return bestScore;
  }
}

export default function play(board) {
  if (!boardIsCorrect(board)) {
    throw new Error("Tablero incorrecto");
  }

  const symbol = symbolPlay(board); // "X" o "O"
  const isMaximizing = symbol === "X";

  let bestMove = null;
  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let index of emptyPositions(board)) {
    board[index] = isMaximizing ? 1 : 2; // 1 = X, 2 = O
    let score = minimax(board, !isMaximizing);
    board[index] = 0;

    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  }

  return bestMove; // índice de la jugada óptima
}
