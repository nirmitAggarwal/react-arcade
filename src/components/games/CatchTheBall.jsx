import React, { useState, useEffect, useCallback } from "react";
import "../../index.css";

const BALL_SIZE = 30;
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_SPEED = 5;
const PADDLE_SPEED = 10;

const CatchTheBall = () => {
  const [paddleX, setPaddleX] = useState(
    window.innerWidth / 2 - PADDLE_WIDTH / 2
  );
  const [ball, setBall] = useState({
    x: Math.random() * (window.innerWidth - BALL_SIZE),
    y: 0,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Handle paddle movement
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setPaddleX((prev) => Math.max(prev - PADDLE_SPEED, 0));
    } else if (e.key === "ArrowRight") {
      setPaddleX((prev) =>
        Math.min(prev + PADDLE_SPEED, window.innerWidth - PADDLE_WIDTH)
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Update ball position and handle collision
  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setBall((prev) => {
        const newX = prev.x + prev.dx;
        const newY = prev.y + prev.dy;

        // Check if ball hits the walls
        if (newX < 0 || newX > window.innerWidth - BALL_SIZE) {
          return { ...prev, dx: -prev.dx };
        }
        if (newY < 0) {
          return { ...prev, dy: -prev.dy };
        }

        // Check if ball hits the paddle
        if (
          newY > window.innerHeight - PADDLE_HEIGHT - BALL_SIZE &&
          newX + BALL_SIZE > paddleX &&
          newX < paddleX + PADDLE_WIDTH
        ) {
          setScore((prevScore) => prevScore + 1);
          return {
            x: Math.random() * (window.innerWidth - BALL_SIZE),
            y: 0,
            dx: BALL_SPEED,
            dy: BALL_SPEED,
          };
        }

        // Check if ball falls below the paddle
        if (newY > window.innerHeight) {
          setGameOver(true);
        }

        return { ...prev, x: newX, y: newY };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [paddleX, gameOver]);

  // Restart the game
  const handleRestart = () => {
    setPaddleX(window.innerWidth / 2 - PADDLE_WIDTH / 2);
    setBall({
      x: Math.random() * (window.innerWidth - BALL_SIZE),
      y: 0,
      dx: BALL_SPEED,
      dy: BALL_SPEED,
    });
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-200 overflow-hidden">
      <header className="absolute top-4 left-4 text-white">
        <h1 className="text-4xl font-bold mb-2">Catch the Ball</h1>
        <p className="text-xl mb-4">Score: {score}</p>
      </header>
      <div
        className="absolute bg-blue-500"
        style={{
          width: PADDLE_WIDTH,
          height: PADDLE_HEIGHT,
          bottom: 0,
          left: paddleX,
        }}
      />
      <div
        className="absolute bg-red-500"
        style={{
          width: BALL_SIZE,
          height: BALL_SIZE,
          borderRadius: "50%",
          top: ball.y,
          left: ball.x,
        }}
      />
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 text-white">
          <h2 className="text-4xl font-bold mb-4">Game Over</h2>
          <p className="text-2xl mb-4">Final Score: {score}</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-green-500 text-white rounded shadow-lg hover:bg-green-600 transition duration-300"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default CatchTheBall;
