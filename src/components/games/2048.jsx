import React, { useState, useEffect } from 'react';
import '../../index.css';

// Helper functions
const newBoard = () => {
  const board = Array.from({ length: 4 }, () => Array(4).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board) => {
  const emptyCells = [];
  board.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell === 0) emptyCells.push([r, c]);
    });
  });
  if (emptyCells.length === 0) return;
  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[r][c] = Math.random() < 0.9 ? 2 : 4;
};

const slideAndCombine = (board, direction) => {
  const combineRow = (row) => {
    let newRow = row.filter(val => val);
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        newRow[i + 1] = 0;
      }
    }
    newRow = newRow.filter(val => val);
    return [...newRow, ...Array(4 - newRow.length).fill(0)];
  };

  const rotateBoard = (board, times) => {
    let newBoard = board;
    for (let i = 0; i < times; i++) {
      newBoard = newBoard[0].map((_, i) => newBoard.map(row => row[i])).reverse();
    }
    return newBoard;
  };

  const move = (board, direction) => {
    const rotatedBoard = rotateBoard(board, direction);
    const movedBoard = rotatedBoard.map(row => combineRow(row));
    return rotateBoard(movedBoard, 4 - direction);
  };

  return move(board, direction);
};

const isGameOver = (board) => {
  const hasEmptyCells = board.flat().includes(0);
  if (hasEmptyCells) return false;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === board[i][j + 1] || board[j][i] === board[j + 1][i]) {
        return false;
      }
    }
  }
  return true;
};

const Two048 = () => {
  const [board, setBoard] = useState(newBoard());
  const [gameOver, setGameOver] = useState(false);

  const handleKeyDown = (e) => {
    if (gameOver) return;

    let newBoard = [...board];
    switch (e.key) {
      case 'ArrowUp':
        newBoard = slideAndCombine(newBoard, 1);
        break;
      case 'ArrowRight':
        newBoard = slideAndCombine(newBoard, 2);
        break;
      case 'ArrowDown':
        newBoard = slideAndCombine(newBoard, 3);
        break;
      case 'ArrowLeft':
        newBoard = slideAndCombine(newBoard, 0);
        break;
      default:
        return;
    }
    addRandomTile(newBoard);
    setBoard(newBoard);
    if (isGameOver(newBoard)) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, gameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">Two048</h1>
      <div className="grid grid-cols-4 gap-4 w-80">
        {board.flat().map((value, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-white font-bold text-xl rounded-lg ${
              value === 0 ? 'bg-gray-800' : `bg-${value < 128 ? 'gray' : 'yellow'}-${Math.log2(value)}`
            }`}
          >
            {value || ''}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded">
          <p>Game Over!</p>
        </div>
      )}
    </div>
  );
};

export default Two048;
