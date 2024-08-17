import React, { useState } from "react";
import "../../index.css";

const flashcards = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome"],
    answer: "Paris",
  },
  { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
  {
    question: "What is the color of the sky?",
    options: ["Blue", "Green", "Red"],
    answer: "Blue",
  },
  // Add more flashcards as needed
];

const FlashcardQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");

  const { question, options, answer } = flashcards[currentIndex];

  const handleOptionClick = (option) => {
    if (option === answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect!");
    }
    setSelectedOption(option);
    setTimeout(() => {
      setSelectedOption("");
      setFeedback("");
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Quiz completed
        setCurrentIndex(0);
        setScore(0);
      }
    }, 1000); // Delay before moving to the next card
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Flashcard Quiz</h1>
        <p className="text-xl mb-4">Score: {score}</p>
      </header>
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{question}</h2>
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`px-4 py-2 rounded border transition duration-300 ${
                selectedOption === option
                  ? option === answer
                    ? "bg-green-500 text-white border-green-600"
                    : "bg-red-500 text-white border-red-600"
                  : "bg-gray-200 border-gray-400"
              }`}
              disabled={!!selectedOption}
            >
              {option}
            </button>
          ))}
        </div>
        {feedback && (
          <p
            className={`text-xl mt-4 ${
              feedback === "Correct!" ? "text-green-600" : "text-red-600"
            }`}
          >
            {feedback}
          </p>
        )}
      </div>
    </div>
  );
};

export default FlashcardQuiz;
