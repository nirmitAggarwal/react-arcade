import React, { useRef, useEffect, useState } from "react";
import "../../index.css";

const FlappyBird = () => {
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const bird = {
    x: 50,
    y: 150,
    width: 40,
    height: 30,
    gravity: 0.6,
    lift: -15,
    velocity: 0,
  };
  const pipe = {
    width: 50,
    gap: 100,
    speed: 2,
    height: 300,
    x: 400,
  };
  let score = 0;

  const draw = (ctx) => {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw pipe
    ctx.fillStyle = "green";
    ctx.fillRect(pipe.x, 0, pipe.width, pipe.height);
    ctx.fillRect(
      pipe.x,
      pipe.height + pipe.gap,
      pipe.width,
      ctx.canvas.height - pipe.height - pipe.gap
    );

    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
  };

  const update = () => {
    if (isGameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    pipe.x -= pipe.speed;
    if (pipe.x + pipe.width < 0) {
      pipe.x = ctx.canvas.width;
      pipe.height = Math.random() * (ctx.canvas.height - pipe.gap - 100) + 50;
      score++;
    }

    // Collision detection
    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipe.gap)
    ) {
      setIsGameOver(true);
    }

    // Check if bird falls below canvas
    if (bird.y + bird.height > ctx.canvas.height) {
      setIsGameOver(true);
    }

    // Redraw game elements
    draw(ctx);
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      bird.velocity = bird.lift;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const gameLoop = () => {
      update();
      requestAnimationFrame(gameLoop);
    };

    window.addEventListener("keydown", handleKeyDown);

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameOver]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 p-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={600}
        className="border-2 border-black"
      ></canvas>
      {isGameOver && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded">
          <p>Game Over! Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default FlappyBird;
