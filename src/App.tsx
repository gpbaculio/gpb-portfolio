import { useEffect, useRef } from "react";
import styled from "styled-components";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
