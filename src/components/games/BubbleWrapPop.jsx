import React, { useState } from "react";
import "../../index.css";

// Helper function to generate bubbles
const generateBubbles = (count) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    popped: false,
  }));
};

// Bubble Wrap Pop component
const BubbleWrapPop = () => {
  const [bubbles, setBubbles] = useState(generateBubbles(30));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleBubbleClick = (id) => {
    if (gameOver) return;

    setBubbles(
      bubbles.map((bubble) =>
        bubble.id === id ? { ...bubble, popped: true } : bubble
      )
    );
    setScore(score + 1);
  };

  const handleReset = () => {
    setBubbles(generateBubbles(30));
    setScore(0);
    setGameOver(false);
  };

  // End the game when all bubbles are popped
  if (!gameOver && bubbles.every((bubble) => bubble.popped)) {
    setGameOver(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Bubble Wrap Pop</h1>
        {gameOver ? (
          <p className="text-2xl font-bold text-green-500">
            Game Over! Score: {score}
          </p>
        ) : (
          <p className="text-xl mb-4">Score: {score}</p>
        )}
      </header>
      <div className="grid grid-cols-6 gap-2">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            onClick={() => handleBubbleClick(bubble.id)}
            className={`w-16 h-16 bg-blue-500 rounded-full cursor-pointer ${
              bubble.popped ? "bg-gray-300" : "hover:bg-blue-600"
            }`}
          ></div>
        ))}
      </div>
      <button
        onClick={handleReset}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {gameOver ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default BubbleWrapPop;
