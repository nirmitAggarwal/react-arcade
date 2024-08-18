import React, { useState } from "react";
import "../../index.css";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F7DC6F",
  "#E67E22",
  "#2ECC71",
  "#E74C3C",
  "#3498DB",
  "#9B59B6",
  "#1ABC9C",
];

const GuessTheColor = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userGuess.toUpperCase() === currentColor.toUpperCase()) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback(`Incorrect! The correct color was ${currentColor}`);
    }
    setUserGuess("");
    setCurrentColor(getRandomColor());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Guess the Color</h1>
        <p className="text-xl mb-4">Score: {score}</p>
      </header>
      <div
        className="w-48 h-48 mb-4"
        style={{ backgroundColor: currentColor }}
      />
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={userGuess}
          onChange={handleGuessChange}
          placeholder="Enter color hex code"
          className="px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      {feedback && (
        <p
          className={`text-xl mt-4 ${
            feedback.includes("Correct") ? "text-green-600" : "text-red-600"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};

export default GuessTheColor;
