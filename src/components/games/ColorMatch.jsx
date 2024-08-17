import React, { useState } from "react";
import "../../index.css";

// Sample color data
const colorData = [
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#00FF00" },
  { name: "Blue", color: "#0000FF" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Purple", color: "#800080" },
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ColorMatch = () => {
  const [colors, setColors] = useState(shuffleArray([...colorData]));
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);

  const handleColorClick = (color) => {
    if (selectedColor) {
      setSelectedColor(null);
      setSelectedName(color);
    } else {
      setSelectedColor(color);
    }
  };

  const handleNameClick = (name) => {
    if (selectedColor) {
      const color = colorData.find((item) => item.name === name).color;
      if (color === selectedColor) {
        setMatches([...matches, { color: selectedColor, name }]);
        setScore(score + 1);
      }
      setSelectedColor(null);
      setSelectedName(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Color Match</h1>
        <p className="text-xl mb-4">Score: {score}</p>
      </header>
      <div className="flex flex-wrap justify-center mb-4">
        {colors.map((item) => (
          <div
            key={item.color}
            onClick={() => handleColorClick(item.color)}
            className="w-24 h-24 m-2 cursor-pointer rounded-full"
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        {colorData.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNameClick(item.name)}
            className={`px-4 py-2 m-2 text-white rounded ${
              selectedName === item.name ? "bg-gray-700" : "bg-blue-500"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
      {matches.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Matches:</h2>
          <ul>
            {matches.map((match, index) => (
              <li key={index} className="text-lg">
                <span
                  className="inline-block w-6 h-6 mr-2 rounded-full"
                  style={{ backgroundColor: match.color }}
                />
                {match.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ColorMatch;
