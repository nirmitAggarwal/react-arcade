import React, { useState, useEffect, useCallback } from "react";
import "../../index.css";

const TARGET_SIZE = 50;
const GAME_TIME = 30; // Game duration in seconds

const ClickToScore = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [targets, setTargets] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Generate random position for targets
  const getRandomPosition = () => {
    const x = Math.random() * (window.innerWidth - TARGET_SIZE);
    const y = Math.random() * (window.innerHeight - TARGET_SIZE);
    return { x, y };
  };

  // Create new targets
  const createTargets = () => {
    const newTargets = Array.from({ length: 5 }, () => ({
      ...getRandomPosition(),
      id: Math.random(),
    }));
    setTargets(newTargets);
  };

  // Handle click on a target
  const handleTargetClick = (id) => {
    setScore((prev) => prev + 1);
    setTargets((prev) => prev.filter((target) => target.id !== id));
    createTargets(); // Create new targets after click
  };

  // Start the game
  useEffect(() => {
    createTargets();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Restart the game
  const handleRestart = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameOver(false);
    createTargets();
  };

  return (
    <div className="relative w-screen h-screen bg-gray-200 overflow-hidden">
      <header className="absolute top-4 left-4 text-white">
        <h1 className="text-3xl font-bold">Click to Score</h1>
        <p className="text-xl mt-2">Score: {score}</p>
        <p className="text-xl mt-2">Time Left: {timeLeft}s</p>
      </header>
      {targets.map((target) => (
        <div
          key={target.id}
          onClick={() => handleTargetClick(target.id)}
          className="absolute bg-red-500 rounded-full cursor-pointer"
          style={{
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            top: target.y,
            left: target.x,
          }}
        />
      ))}
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white">
          <h2 className="text-4xl font-bold mb-4">Game Over</h2>
          <p className="text-2xl mb-4">Final Score: {score}</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default ClickToScore;
