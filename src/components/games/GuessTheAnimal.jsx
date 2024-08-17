import React, { useState, useRef, useEffect } from "react";
import "../../index.css";

// Sample animal data with simple drawings
const animalData = [
  { name: "Lion", draw: (ctx) => drawLion(ctx) },
  { name: "Elephant", draw: (ctx) => drawElephant(ctx) },
  { name: "Giraffe", draw: (ctx) => drawGiraffe(ctx) },
  { name: "Monkey", draw: (ctx) => drawMonkey(ctx) },
  { name: "Penguin", draw: (ctx) => drawPenguin(ctx) },
];

// Drawing functions
function drawLion(ctx) {
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, Math.PI * 2, true); // Head
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(135, 90, 10, 0, Math.PI * 2, true); // Eye
  ctx.arc(165, 90, 10, 0, Math.PI * 2, true); // Eye
  ctx.fill();
  ctx.beginPath();
  ctx.arc(150, 110, 15, 0, Math.PI, false); // Mouth
  ctx.stroke();
}

function drawElephant(ctx) {
  ctx.fillStyle = "gray";
  ctx.beginPath();
  ctx.ellipse(150, 100, 60, 40, 0, 0, Math.PI * 2); // Body
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(120, 80, 20, 30, 0, 0, Math.PI * 2); // Ear
  ctx.ellipse(180, 80, 20, 30, 0, 0, Math.PI * 2); // Ear
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = "lightgray";
  ctx.ellipse(150, 110, 10, 20, 0, 0, Math.PI * 2); // Trunk
  ctx.fill();
}

function drawGiraffe(ctx) {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.fillRect(120, 60, 40, 100); // Body
  ctx.beginPath();
  ctx.fillRect(130, 30, 20, 30); // Neck
  ctx.beginPath();
  ctx.arc(140, 20, 10, 0, Math.PI * 2); // Head
  ctx.fill();
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(135, 10, 5, 0, Math.PI * 2); // Horn
  ctx.arc(145, 10, 5, 0, Math.PI * 2); // Horn
  ctx.fill();
}

function drawMonkey(ctx) {
  ctx.fillStyle = "brown";
  ctx.beginPath();
  ctx.arc(150, 100, 50, 0, Math.PI * 2); // Head
  ctx.fill();
  ctx.fillStyle = "pink";
  ctx.beginPath();
  ctx.arc(130, 90, 15, 0, Math.PI * 2); // Left Ear
  ctx.arc(170, 90, 15, 0, Math.PI * 2); // Right Ear
  ctx.fill();
}

function drawPenguin(ctx) {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.ellipse(150, 100, 50, 70, 0, 0, Math.PI * 2); // Body
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.ellipse(150, 100, 40, 50, 0, 0, Math.PI * 2); // Belly
  ctx.fill();
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.ellipse(150, 150, 10, 15, 0, 0, Math.PI * 2); // Beak
  ctx.fill();
}

const GuessTheAnimalWithCanvas = () => {
  const [currentAnimal, setCurrentAnimal] = useState(getRandomAnimal());
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);

  function getRandomAnimal() {
    return animalData[Math.floor(Math.random() * animalData.length)];
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    currentAnimal.draw(ctx);
  }, [currentAnimal]);

  const handleGuessChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userGuess.toLowerCase() === currentAnimal.name.toLowerCase()) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback(`Incorrect! The correct answer was ${currentAnimal.name}`);
    }
    setUserGuess("");
    setCurrentAnimal(getRandomAnimal());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Guess the Animal</h1>
        <p className="text-xl mb-4">Score: {score}</p>
      </header>
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          className="border border-gray-300 rounded shadow-lg"
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={userGuess}
          onChange={handleGuessChange}
          placeholder="Enter the animal name"
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

export default GuessTheAnimalWithCanvas;
