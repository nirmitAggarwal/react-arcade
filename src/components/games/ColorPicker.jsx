import React, { useState, useEffect } from "react";
import "../../index.css";

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ColorPicker = () => {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [selectedColor, setSelectedColor] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setTargetColor(generateRandomColor());
  }, []);

  const handleColorClick = (color) => {
    setSelectedColor(color);
    if (color === targetColor) {
      setResult("Correct!");
    } else {
      setResult("Try Again!");
    }
  };

  const generatePalette = () => {
    const palette = [targetColor];
    for (let i = 0; i < 4; i++) {
      palette.push(generateRandomColor());
    }
    return palette.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 text-white">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Color Picker Game</h1>
        <p className="text-xl mb-4">Match the target color!</p>
      </header>
      <div className="mb-4">
        <div className="text-xl mb-2">Target Color:</div>
        <div
          className="w-24 h-24 rounded"
          style={{ backgroundColor: targetColor }}
        ></div>
      </div>
      <div className="flex space-x-4 mb-4">
        {generatePalette().map((color, index) => (
          <div
            key={index}
            onClick={() => handleColorClick(color)}
            className="w-24 h-24 rounded cursor-pointer"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
      <div className="text-2xl">{result}</div>
      <button
        onClick={() => {
          setTargetColor(generateRandomColor());
          setSelectedColor("");
          setResult("");
        }}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorPicker;
