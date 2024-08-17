import React, { useState } from "react";
import "../../index.css";

const ClickerGame = () => {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  const handleReset = () => {
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Clicker Game</h1>
        <p className="text-xl mb-4">Click the button to increase your score!</p>
        <p className="text-3xl font-bold">{score}</p>
      </header>
      <div className="flex flex-col items-center">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Click Me!
        </button>
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded shadow-lg hover:bg-gray-600 transition duration-300"
        >
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default ClickerGame;
