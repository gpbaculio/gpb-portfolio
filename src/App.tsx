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
      let particles: Particle[];
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
        color: string;
        constructor(
          x: number,
          y: number,
          directionX: number,
          directionY: number,
          size: number,
          color: string
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

        //check particle position, check mouse position, move the particle, draw the particle
        update() {
          if (mouse && mouse.x && mouse.y) {
            //check if particle is still within canvas, if it has, reverse direction x, y values in opposite direction
            if (this.x > canvas.width || this.x < 0) {
              this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
              this.directionY = this.directionY;
            }

            // check collision detection - mouse position / particle position
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
              if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
              }
              if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
              }
              if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
              }
              if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
              }
            }

            // move particle
            this.x += this.directionX;
            this.y += this.directionY;

            // draw particle
            this.draw();
          }
        }
      }
      const init = () => {
        if (canvas) {
          particles = [];
          let particlesCount = (canvas.height * canvas.width) / 9000;
          for (let i = 0; i < particlesCount; i++) {
            let size = Math.random() * 5 + 1;
            let x =
              Math.random() * (window.innerWidth - size * 2 - size * 2) +
              size * 2;
            let y =
              Math.random() * (window.innerHeight - size * 2 - size * 2) +
              size * 2;
            let directionX = Math.random() * 5 - 2.5;
            let directionY = Math.random() * 5 - 2.5;
            let color = "#8c5523";
            particles.push(
              new Particle(x, y, directionX, directionY, size, color)
            );
          }
        }
      };

      //animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          for (let i = 0; i < particles.length; i++) {
            particles[i].update();
          }
        }
      };

      init();
      animate();
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
