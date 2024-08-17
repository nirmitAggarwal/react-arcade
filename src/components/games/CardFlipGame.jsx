import React, { useState, useEffect } from "react";
import "../../index.css";

// Define card values and create pairs
const cardValues = ["🍎", "🍌", "🍒", "🍇", "🍉", "🍊", "🍍", "🥭"];

const generateCards = () => {
  const cards = [...cardValues, ...cardValues];
  return cards.sort(() => Math.random() - 0.5);
};

const CardFlipGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
        if (matchedIndices.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedIndices]);

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    ) {
      return;
    }
    setFlippedIndices((prev) => [...prev, index]);
  };

  const handleReset = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold mb-2">Card Flip Game</h1>
        <p className="text-xl mb-4">Find matching pairs of cards!</p>
        {gameOver && (
          <p className="text-2xl font-bold text-green-500">
            Congratulations! You won with {moves} moves!
          </p>
        )}
        {!gameOver && <p className="text-xl mb-4">Moves: {moves}</p>}
      </header>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((value, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-24 h-24 flex items-center justify-center cursor-pointer border-2 rounded-md transition duration-300 ${
              flippedIndices.includes(index) || matchedIndices.includes(index)
                ? "bg-white text-4xl"
                : "bg-gray-300"
            }`}
          >
            {(flippedIndices.includes(index) ||
              matchedIndices.includes(index)) &&
              value}
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

export default CardFlipGame;
