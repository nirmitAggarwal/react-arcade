import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../index.css";

const BasicTypingGame = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get(
          "https://random-word-api.herokuapp.com/word?number=10"
        );
        setWords(response.data);
        setCurrentWord(
          response.data[Math.floor(Math.random() * response.data.length)]
        );
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === currentWord) {
      setScore(score + 1);
      setUserInput("");
      // Fetch a new word
      const newWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(newWord);
    }
  };

  useEffect(() => {
    if (!isTyping) {
      inputRef.current.focus();
      setIsTyping(true);
    }
  }, [isTyping]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 text-white">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Basic Typing Game</h1>
        <p className="text-xl mb-2">Type the word displayed below:</p>
        <p className="text-2xl font-semibold mb-4">{currentWord}</p>
        <p className="text-lg mb-2">Score: {score}</p>
      </header>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          ref={inputRef}
          className="w-full px-4 py-2 text-black rounded"
          autoFocus
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <div className="mt-4 text-lg">
        <p>Type the word as fast as you can to increase your score!</p>
      </div>
    </div>
  );
};

export default BasicTypingGame;
