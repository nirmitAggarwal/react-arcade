import React, { useRef, useEffect } from "react";
import p5 from "p5";

const DrawingBoard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let drawing = [];
      let currentPath = [];
      let isDrawing = false;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(255);
        p.strokeWeight(4);
        p.stroke(0);
        p.noFill();
      };

      p.draw = () => {
        p.background(255); // Clear the background
        for (let path of drawing) {
          p.beginShape();
          for (let point of path) {
            p.vertex(point.x, point.y);
          }
          p.endShape();
        }
        if (isDrawing) {
          p.beginShape();
          for (let point of currentPath) {
            p.vertex(point.x, point.y);
          }
          p.endShape();
        }
      };

      p.mousePressed = () => {
        isDrawing = true;
        currentPath = [];
        drawing.push(currentPath);
      };

      p.mouseDragged = () => {
        currentPath.push(p.createVector(p.mouseX, p.mouseY));
      };

      p.mouseReleased = () => {
        isDrawing = false;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

    const myP5 = new p5(sketch);

    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div>
      <div ref={canvasRef}></div>
    </div>
  );
};

export default DrawingBoard;
