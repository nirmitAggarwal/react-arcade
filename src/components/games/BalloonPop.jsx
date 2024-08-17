import React, { useState, useEffect } from "react";
import "../../index.css";

// Balloon dimensions and game settings
const BALLOON_SIZE = 100; // Size of each balloon
const NUM_BALLOONS = 10; // Number of balloons on the screen
const GAME_DURATION = 30; // Duration of the game in seconds

const BalloonPop = () => {
  const [balloons, setBalloons] = useState(generateBalloons());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameActive, setIsGameActive] = useState(false);

  // Generate random balloon positions
  function generateBalloons() {
    return Array.from({ length: NUM_BALLOONS }, () => ({
      id: Math.random(),
      top: Math.random() * (window.innerHeight - BALLOON_SIZE),
      left: Math.random() * (window.innerWidth - BALLOON_SIZE),
    }));
  }

  // Start the game
  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBalloons(generateBalloons());
    setIsGameActive(true);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle balloon click
  const handleBalloonClick = (id) => {
    if (isGameActive) {
      setScore(score + 1);
      setBalloons(balloons.filter((balloon) => balloon.id !== id));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Balloon Pop</h1>
        <p className="text-xl mb-4">Score: {score}</p>
        <p className="text-xl mb-4">Time Left: {timeLeft}s</p>
      </header>
      <button
        onClick={startGame}
        className={`px-6 py-3 mb-4 ${
          isGameActive ? "bg-gray-400" : "bg-blue-500"
        } text-white rounded shadow-lg hover:bg-blue-600 transition duration-300`}
        disabled={isGameActive}
      >
        {isGameActive ? "Game Running" : "Start Game"}
      </button>
      <div className="relative w-full h-screen">
        {balloons.map((balloon) => (
          <div
            key={balloon.id}
            className="absolute cursor-pointer"
            style={{
              top: balloon.top,
              left: balloon.left,
              width: BALLOON_SIZE,
              height: BALLOON_SIZE,
              backgroundImage: "url(/path/to/balloon-image.png)", // Add your balloon image path
              backgroundSize: "cover",
            }}
            onClick={() => handleBalloonClick(balloon.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BalloonPop;
