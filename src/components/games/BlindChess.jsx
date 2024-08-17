import React, { useState, useEffect } from "react";
import "../../index.css";

// Initialize the chess board
const initializeBoard = () => {
  const initialBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));
  const piecePlacement = [
    "r",
    "n",
    "b",
    "q",
    "k",
    "b",
    "n",
    "r",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    "p",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "P",
    "P",
    "P",
    "P",
    "P",
    "P",
    "P",
    "P",
    "R",
    "N",
    "B",
    "Q",
    "K",
    "B",
    "N",
    "R",
  ];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      initialBoard[i][j] = piecePlacement[i * 8 + j];
    }
  }

  return initialBoard;
};

const isValidMove = (board, from, to) => {
  // Basic validation for demonstration; you can enhance this with proper chess rules
  return (
    board[to.row][to.col] === null ||
    board[to.row][to.col] !== board[from.row][from.col]
  );
};

const BlindChess = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [turn, setTurn] = useState("white");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handleSquareClick = (row, col) => {
    if (gameOver) return;

    if (selectedSquare) {
      const from = selectedSquare;
      const to = { row, col };
      if (isValidMove(board, from, to)) {
        const newBoard = board.map((r) => r.slice());
        newBoard[to.row][to.col] = newBoard[from.row][from.col];
        newBoard[from.row][from.col] = null;

        setBoard(newBoard);
        setMoveHistory([...moveHistory, { from, to }]);
        setTurn(turn === "white" ? "black" : "white");
        setSelectedSquare(null);
      } else {
        alert("Invalid move");
        setSelectedSquare(null);
      }
    } else {
      setSelectedSquare({ row, col });
    }
  };

  useEffect(() => {
    // Check for game over conditions (e.g., checkmate, stalemate)
    // For now, we only handle basic game over scenario
    if (moveHistory.length > 100) {
      // Arbitrary long game condition
      setGameOver(true);
    }
  }, [moveHistory]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">Blind Chess</h1>
      <div className="grid grid-cols-8 gap-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 flex items-center justify-center text-xl font-bold cursor-pointer ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } ${
                selectedSquare &&
                selectedSquare.row === rowIndex &&
                selectedSquare.col === colIndex
                  ? "border-4 border-yellow-400"
                  : ""
              }`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))
        )}
      </div>
      <button
        className="mt-4 px-6 py-3 bg-blue-500 rounded text-white font-bold text-lg hover:bg-blue-700"
        onClick={() => setBoard(initializeBoard())}
      >
        Restart
      </button>
      {gameOver && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded">
          <p>Game Over!</p>
        </div>
      )}
      <div className="mt-4 text-white">
        <p>Current Turn: {turn}</p>
        <p>
          Move History:{" "}
          {moveHistory.map((move, index) => (
            <span key={index}>
              {`(${move.from.row}, ${move.from.col}) -> (${move.to.row}, ${move.to.col})`}{" "}
              {index < moveHistory.length - 1 ? " | " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default BlindChess;
