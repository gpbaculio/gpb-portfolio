import { useEffect, useRef } from "react";
import styled from "styled-components";

import "./App.css";
type CanvasMouseType = {
  x: number | null;
  y: number | null;
  radius: number;
};
function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      let particles;
      let mouse: CanvasMouseType = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80),
      };
      window.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
      });
      class Particle {
        x: number;
        y: number;
        directionX: number;
        directionY: number;
        size: number;
        color: number;
        constructor(
          x: number,
          y: number,
          directionX: number,
          directionY: number,
          size: number,
          color: number
        ) {
          this.x = x;
          this.y = y;
          this.directionX = directionX;
          this.directionY = directionY;
          this.size = size;
          this.color = color;
        }
        // method to draw individual particle
        draw() {
          if (canvasCtx) {
            canvasCtx.beginPath();
            canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            canvasCtx.fillStyle = "#8c5523";
            canvasCtx.fill();
          }
        }
      }
    }
  }, []);

  return <Canvas1 ref={canvasRef} />;
}

export default App;

const Canvas1 = styled.canvas`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(#ffc38c, #ff9b40);
  position: absolute;
`;
