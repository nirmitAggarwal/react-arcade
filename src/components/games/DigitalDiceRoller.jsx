import React, { useState } from "react";
import "../../index.css";

const faces = [1, 2, 3, 4, 5, 6];

const DigitalDiceRoller = () => {
  const [roll, setRoll] = useState(1);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  const rollDice = () => {
    const newRoll = faces[Math.floor(Math.random() * faces.length)];
    setRoll(newRoll);

    // Update score and result message based on roll
    if (newRoll === 6) {
      setScore((prev) => prev + 1);
      setResultMessage("Congratulations! You rolled a 6!");
    } else {
      setResultMessage("Try again!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Digital Dice Roller</h1>
        <p className="text-xl mb-4">
          Roll the dice and try to get a 6 to win points!
        </p>
        <p className="text-lg mb-4">Score: {score}</p>
        <p
          className={`text-xl font-semibold ${
            resultMessage.includes("Congratulations")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {resultMessage}
        </p>
      </header>
      <div
        className={`w-32 h-32 flex items-center justify-center text-6xl font-bold rounded border-4 border-gray-800 bg-white mb-4 shadow-lg transform transition-transform ${
          roll === 1
            ? "rotate-0 scale-100"
            : roll === 2
            ? "rotate-45 scale-100"
            : roll === 3
            ? "rotate-90 scale-100"
            : roll === 4
            ? "rotate-135 scale-100"
            : roll === 5
            ? "rotate-180 scale-100"
            : roll === 6
            ? "rotate-225 scale-100"
            : "scale-100"
        }`}
      >
        {roll}
      </div>
      <button
        onClick={rollDice}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default DigitalDiceRoller;
