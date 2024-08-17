import React, { useRef, useState, useEffect } from "react";
import "../../index.css";

const DigitalPetRock = () => {
  const canvasRef = useRef(null);
  const [action, setAction] = useState(null);
  const [color, setColor] = useState("#7D7D7D");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rockSize = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawRock = (color, x = centerX, y = centerY) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(x, y, rockSize, rockSize, 0, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(message, x, y);
    };

    const blink = () => {
      setMessage("👁️👁️");
      setTimeout(() => setMessage(""), 500);
    };

    const changeColor = () => {
      const colors = ["#7D7D7D", "#FF6347", "#4682B4", "#32CD32", "#FFD700"];
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(newColor);
    };

    const sayHello = () => {
      setMessage("Hello! 😊");
      setTimeout(() => setMessage(""), 2000);
    };

    const shake = () => {
      const shakeDistance = 20;
      let count = 0;
      const shakeInterval = setInterval(() => {
        const offset = count % 2 === 0 ? shakeDistance : -shakeDistance;
        drawRock(color, centerX + offset, centerY);
        count += 1;
        if (count === 10) {
          clearInterval(shakeInterval);
          drawRock(color);
        }
      }, 100);
    };

    const bounce = () => {
      let startY = centerY;
      let direction = -1;
      const bounceInterval = setInterval(() => {
        if (startY <= centerY - 50 || startY >= centerY) {
          direction *= -1;
        }
        startY += direction * 5;
        drawRock(color, centerX, startY);
        if (startY === centerY && direction === -1) {
          clearInterval(bounceInterval);
          drawRock(color);
        }
      }, 50);
    };

    const spin = () => {
      let angle = 0;
      const spinInterval = setInterval(() => {
        angle += 15;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((angle * Math.PI) / 180);
        drawRock(color, 0, 0);
        ctx.restore();
        if (angle >= 360) {
          clearInterval(spinInterval);
          drawRock(color);
        }
      }, 50);
    };

    drawRock(color);

    if (action === "blink") {
      blink();
    } else if (action === "colorChange") {
      changeColor();
    } else if (action === "sayHello") {
      sayHello();
    } else if (action === "shake") {
      shake();
    } else if (action === "bounce") {
      bounce();
    } else if (action === "spin") {
      spin();
    }

    setAction(null);
  }, [action, color, message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 text-white">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold mb-2">Digital Pet Rock</h1>
        <p className="text-xl mb-4">Interact with your virtual pet rock!</p>
      </header>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="mb-4"
      ></canvas>
      <div className="flex space-x-4">
        <button
          onClick={() => setAction("blink")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Blink
        </button>
        <button
          onClick={() => setAction("colorChange")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Change Color
        </button>
        <button
          onClick={() => setAction("sayHello")}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
        >
          Say Hello
        </button>
        <button
          onClick={() => setAction("shake")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Shake
        </button>
        <button
          onClick={() => setAction("bounce")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
        >
          Bounce
        </button>
        <button
          onClick={() => setAction("spin")}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-700"
        >
          Spin
        </button>
      </div>
    </div>
  );
};

export default DigitalPetRock;
