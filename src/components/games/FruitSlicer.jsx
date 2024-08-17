import React, { useState, useEffect, useRef } from "react";
import "../../index.css";

// Define the fruit types
const fruitTypes = ["apple", "banana", "cherry", "grape"];

const getRandomFruit = () => ({
  type: fruitTypes[Math.floor(Math.random() * fruitTypes.length)],
  x: Math.random() * (window.innerWidth - 50),
  y: -50,
});

const FruitSlicer = () => {
  const [fruits, setFruits] = useState([getRandomFruit()]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const fruitRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      setFruits((prevFruits) => {
        const newFruits = prevFruits.map((fruit) => ({
          ...fruit,
          y: fruit.y + 5,
        }));

        // Add new fruits
        if (Math.random() < 0.05) {
          newFruits.push(getRandomFruit());
        }

        // Check if any fruit is out of bounds
        const updatedFruits = newFruits.filter(
          (fruit) => fruit.y < window.innerHeight
        );
        if (updatedFruits.length < newFruits.length) {
          setGameOver(true);
        }

        return updatedFruits;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

  const handleFruitClick = (index) => {
    setScore(score + 1);
    setFruits(fruits.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setFruits([getRandomFruit()]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 overflow-hidden">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Fruit Slicer</h1>
        <p className="text-xl mb-4">Click on falling fruits to score points!</p>
        {gameOver && (
          <p className="text-2xl font-bold text-red-500">
            Game Over! Your score: {score}
          </p>
        )}
        {!gameOver && <p className="text-2xl font-bold">Score: {score}</p>}
      </header>
      <div className="absolute top-0 left-0 w-full h-full">
        {fruits.map((fruit, index) => (
          <div
            key={index}
            onClick={() => handleFruitClick(index)}
            ref={(el) => (fruitRef.current[index] = el)}
            className={`absolute w-12 h-12 cursor-pointer ${fruit.type}-icon`}
            style={{ left: fruit.x, top: fruit.y }}
          >
            {fruit.type === "apple" && (
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 4.5C13.1 4.5 14 5.4 14 6.5C14 7.6 13.1 8.5 12 8.5C10.9 8.5 10 7.6 10 6.5C10 5.4 10.9 4.5 12 4.5M12 20C7.25 20 4 15.75 4 12H6.55C7.04 14.76 9.37 16.5 12 16.5C14.63 16.5 16.96 14.76 17.45 12H20C20 15.75 16.75 20 12 20M12 6.5C12.55 6.5 13 6.95 13 7.5C13 8.05 12.55 8.5 12 8.5C11.45 8.5 11 8.05 11 7.5C11 6.95 11.45 6.5 12 6.5Z" />
              </svg>
            )}
            {fruit.type === "banana" && (
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.73 20.27L19.57 22.43L15.3 18.16L12.93 20.53L12.23 19.83L10.71 21.35L8.77 19.42L10.93 17.27L12.36 18.7L14.22 16.84L17.98 20.6L21.73 20.27M16.78 12.26L14.91 10.39L10.4 14.9L8.76 13.27L4.58 17.45L5.31 14.51L9.42 10.38L8.43 9.39L12.48 5.36L14.2 6.47L16.78 12.26M12.23 7.79L12.87 8.43L10.71 10.59L7.61 7.49L6.7 8.4L8.84 10.53L11.91 7.46L12.23 7.79Z" />
              </svg>
            )}
            {fruit.type === "cherry" && (
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 6C11.59 6 11.19 6.09 10.86 6.26L8.8 7.27C7.51 7.9 6.69 8.6 6.69 9.54C6.69 10.49 7.51 11.2 8.8 11.83L10.86 12.83C11.19 12.91 11.59 13 12 13C12.41 13 12.81 12.91 13.14 12.74L15.2 11.73C16.49 11.1 17.31 10.4 17.31 9.46C17.31 8.51 16.49 7.81 15.2 7.18L13.14 6.17C12.81 6.09 12.41 6 12 6M12 4.5C11.17 4.5 10.4 4.79 9.78 5.37L8.8 6.34L8.62 6.5L8.4 6.72L6.66 8.5C5.44 9.72 5.62 11.62 7.17 12.34L9.19 13.27C9.65 13.46 10.14 13.5 10.63 13.27L12.77 12.54L12.95 12.47L13.22 12.34L13.3 12.23L15.53 10.58C16.5 9.57 16.32 7.68 14.77 6.96L12.76 6.03L12.37 5.79C11.84 5.56 11.3 5.5 10.8 5.76L8.8 6.75L8.57 6.88L8.34 7.05L6.5 8.88C5.52 9.85 5.38 11.28 6.6 12.23L8.65 13.16L8.86 13.27L10.57 13.77L10.92 13.93L10.85 13.77C10.75 13.61 10.63 13.44 10.49 13.29L12.27 12.54L12.48 12.41L12.36 12.27C12.16 12.08 11.92 11.9 11.62 11.77L9.61 10.83C8.76 10.6 8.43 9.72 9.29 9.15L11.22 7.76C11.34 7.66 11.49 7.55 11.64 7.5L12 7.5L12 4.5Z" />
              </svg>
            )}
            {fruit.type === "grape" && (
              <svg
                className="w-12 h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C9.54 2 7.5 4.04 7.5 6.5C7.5 8.97 9.5 11.5 12 11.5C14.5 11.5 16.5 8.97 16.5 6.5C16.5 4.04 14.46 2 12 2M12 9C10.3 9 9 7.7 9 6.5C9 5.3 10.3 4 12 4C13.7 4 15 5.3 15 6.5C15 7.7 13.7 9 12 9M12 15C9.79 15 8 16.79 8 19C8 21.21 9.79 23 12 23C14.21 23 16 21.21 16 19C16 16.79 14.21 15 12 15M12 20C11.45 20 11 19.55 11 19C11 18.45 11.45 18 12 18C12.55 18 13 18.45 13 19C13 19.55 12.55 20 12 20Z" />
              </svg>
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 mt-4"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default FruitSlicer;
