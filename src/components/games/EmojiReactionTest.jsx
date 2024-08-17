import React, { useState, useEffect, useRef } from "react";
import "../../index.css";

// List of emojis
const emojis = ["😊", "😂", "🥰", "🤔", "😎", "🤯", "😡", "😱", "😴", "🥳"];

const EmojiReactionTest = () => {
  const [promptEmoji, setPromptEmoji] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const promptTimeout = useRef(null);

  useEffect(() => {
    if (isTestRunning) {
      startTest();
    }

    return () => {
      clearTimeout(promptTimeout.current);
    };
  }, [isTestRunning]);

  const startTest = () => {
    setScore(0);
    setReactionTime(null);
    setShowPrompt(false);
    setStartTime(null);

    const randomTime = Math.floor(Math.random() * 3000) + 1000; // Random time between 1-4 seconds

    promptTimeout.current = setTimeout(() => {
      setPromptEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      setStartTime(Date.now());
      setShowPrompt(true);
    }, randomTime);
  };

  const handleEmojiClick = () => {
    if (showPrompt) {
      const reactionDuration = Date.now() - startTime;
      setReactionTime(reactionDuration);
      setShowPrompt(false);
      setScore((prevScore) => prevScore + 1);
      setTimeout(() => {
        startTest();
      }, 1000); // Restart the test after 1 second
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 text-white">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Emoji Reaction Test</h1>
        <p className="text-xl mb-2">Score: {score}</p>
        <p className="text-xl mb-4">
          {reactionTime !== null
            ? `Your reaction time: ${reactionTime} ms`
            : ""}
        </p>
      </header>
      <div
        className={`w-24 h-24 flex items-center justify-center text-6xl ${
          showPrompt ? "animate-pulse" : ""
        }`}
        onClick={handleEmojiClick}
      >
        {promptEmoji || "?"}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => setIsTestRunning(true)}
      >
        Start Test
      </button>
      {reactionTime === null && !isTestRunning && (
        <p className="mt-4 text-lg">Press "Start Test" to begin.</p>
      )}
    </div>
  );
};

export default EmojiReactionTest;
