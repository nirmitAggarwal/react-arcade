import React, { useRef, useEffect, useState } from "react";
import "../../index.css";

const canvasWidth = 800;
const canvasHeight = 600;
const platformHeight = 20;
const playerSize = 30;
const gravity = 0.5;
const jumpPower = -10;
const moveSpeed = 5;

const BasicPlatformer = () => {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({
    x: 50,
    y: canvasHeight - 100,
    vx: 0,
    vy: 0,
    isJumping: false,
  });
  const [platforms] = useState([
    { x: 0, y: canvasHeight - 20, width: canvasWidth, height: platformHeight },
    { x: 150, y: canvasHeight - 150, width: 200, height: platformHeight },
    { x: 400, y: canvasHeight - 250, width: 200, height: platformHeight },
  ]);
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const update = () => {
      // Update player position based on velocity
      setPlayer((prev) => ({
        ...prev,
        x: prev.x + prev.vx,
        y: prev.y + prev.vy,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#000";
      ctx.fillRect(player.x, player.y, playerSize, playerSize);

      platforms.forEach((platform) => {
        ctx.fillStyle = "#888";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
      });
    };

    const gameLoop = () => {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, [player, platforms]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys((prevKeys) => ({ ...prevKeys, [e.key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const handleMovement = () => {
      setPlayer((prev) => {
        const { x, y, vx, vy, isJumping } = prev;
        let newVx = vx;
        let newVy = vy + gravity;
        let newX = x;
        let newY = y;

        if (keys["ArrowRight"]) {
          newVx = moveSpeed;
        } else if (keys["ArrowLeft"]) {
          newVx = -moveSpeed;
        } else {
          newVx = 0;
        }

        if (keys[" "]) {
          if (!isJumping) {
            newVy = jumpPower;
            setPlayer((prev) => ({ ...prev, isJumping: true }));
          }
        }

        // Check collision with platforms
        const newYAfterGravity = y + newVy;
        const onGround = platforms.some(
          (p) =>
            newYAfterGravity + playerSize <= p.y + platformHeight &&
            newYAfterGravity + playerSize >= p.y &&
            x + playerSize >= p.x &&
            x <= p.x + p.width
        );

        if (onGround) {
          newY =
            platforms.find(
              (p) =>
                newYAfterGravity + playerSize <= p.y + platformHeight &&
                newYAfterGravity + playerSize >= p.y &&
                x + playerSize >= p.x &&
                x <= p.x + p.width
            ).y - playerSize;
          newVy = 0;
          setPlayer((prev) => ({ ...prev, isJumping: false }));
        } else {
          newY = newYAfterGravity;
        }

        return {
          x: newX + newVx,
          y: newY,
          vx: newVx,
          vy: newVy,
          isJumping: isJumping,
        };
      });
    };

    const interval = setInterval(handleMovement, 1000 / 60);

    return () => clearInterval(interval);
  }, [keys, player]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-600"
      />
    </div>
  );
};

export default BasicPlatformer;
