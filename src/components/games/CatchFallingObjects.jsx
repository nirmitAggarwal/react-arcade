import React, { useState, useEffect, useCallback } from "react";
import "../../index.css";

// Define the falling objects and their sizes
const objects = ["🍎", "🍌", "🍒", "🍇", "🍉"];
const objectSize = 40; // Size of the falling objects

const generateFallingObject = () => ({
  type: objects[Math.floor(Math.random() * objects.length)],
  x: Math.floor(Math.random() * (window.innerWidth - objectSize)),
  y: -objectSize,
});

const CatchFallingObjects = () => {
  const [basketX, setBasketX] = useState(
    window.innerWidth / 2 - objectSize / 2
  );
  const [fallingObjects, setFallingObjects] = useState([
    generateFallingObject(),
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;

    const handleKeyDown = (e) => {
      const basketWidth = objectSize;
      const moveAmount = 20;
      if (e.key === "ArrowLeft" && basketX > 0) {
        setBasketX((prev) => Math.max(prev - moveAmount, 0));
      } else if (
        e.key === "ArrowRight" &&
        basketX < window.innerWidth - basketWidth
      ) {
        setBasketX((prev) =>
          Math.min(prev + moveAmount, window.innerWidth - basketWidth)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [basketX, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setFallingObjects((prev) => {
        const updatedObjects = prev.map((obj) => ({
          ...obj,
          y: obj.y + 5,
        }));

        // Check for collisions
        updatedObjects.forEach((obj) => {
          if (obj.y > window.innerHeight) {
            setGameOver(true);
          } else if (
            obj.y + objectSize > window.innerHeight - objectSize &&
            obj.x < basketX + objectSize &&
            obj.x + objectSize > basketX
          ) {
            setScore((prev) => prev + 1);
            return;
          }
        });

        return updatedObjects.filter((obj) => obj.y <= window.innerHeight);
      });

      // Add new falling object
      setFallingObjects((prev) => [...prev, generateFallingObject()]);
    }, 100);

    return () => clearInterval(interval);
  }, [basketX, gameOver]);

  const handleRestart = () => {
    setBasketX(window.innerWidth / 2 - objectSize / 2);
    setFallingObjects([generateFallingObject()]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-200 overflow-hidden">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Catch the Falling Objects</h1>
        <p className="text-xl mb-4">Move the basket to catch falling items!</p>
        {gameOver && (
          <p className="text-2xl font-bold text-red-500">
            Game Over! Your score: {score}
          </p>
        )}
        {!gameOver && <p className="text-xl mb-4">Score: {score}</p>}
      </header>
      <div
        className="absolute bottom-0 left-0 w-16 h-16 bg-gray-800"
        style={{ transform: `translateX(${basketX}px)` }}
      />
      {fallingObjects.map((obj, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: obj.x,
            top: obj.y,
            width: objectSize,
            height: objectSize,
            fontSize: "24px",
            textAlign: "center",
            lineHeight: `${objectSize}px`,
          }}
        >
          {obj.type}
        </div>
      ))}
      {gameOver && (
        <button
          onClick={handleRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 mt-4 absolute bottom-4"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default CatchFallingObjects;
