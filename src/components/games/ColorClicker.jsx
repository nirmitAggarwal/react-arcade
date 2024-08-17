import React, { useState, useEffect } from "react";
import "../../index.css";

// Helper function to get a random color
const getRandomColor = () => {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink"];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Color Clicker component
const ColorClicker = () => {
  const [color, setColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  // Update the color every second and decrease time left
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setInterval(() => {
        setColor(getRandomColor());
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const handleClick = () => {
    if (!isGameOver) {
      setScore(score + 1);
      setColor(getRandomColor());
      setClicks(clicks + 1);
    }
  };

  const resetGame = () => {
    setColor(getRandomColor());
    setScore(0);
    setClicks(0);
    setTimeLeft(30);
    setIsGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Color Clicker</h1>
        <p className="text-xl mb-4">
          Click on the colored square to score points!
        </p>
        {isGameOver ? (
          <p className="text-2xl font-bold text-red-500">Game Over!</p>
        ) : (
          <p className="text-xl mb-4">Time Left: {timeLeft}s</p>
        )}
      </header>
      <div
        className="w-48 h-48 mb-4"
        style={{ backgroundColor: color }}
        onClick={handleClick}
      ></div>
      <p className="text-xl mb-4">Score: {score}</p>
      <p className="text-xl mb-4">Clicks: {clicks}</p>
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isGameOver ? "Play Again" : "Reset Game"}
      </button>
    </div>
  );
};

export default ColorClicker;
