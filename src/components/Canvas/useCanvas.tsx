import { useEffect, useRef, useState } from 'react';

function useCanvas(lineColor = 'black', lineWidth = 5) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setIsDrawing(true);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(clientX, clientY);
  };

  const finishDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    const { clientX, clientY } = e;
    contextRef.current?.lineTo(clientX, clientY);
    contextRef.current?.stroke();
  };

  const clearCanvas = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    }
  };

  const eventHandlers = {
    startDrawing,
    finishDrawing,
    draw,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
      }
      contextRef.current = ctx;
    }
  }, [lineColor, lineWidth]);

  return { canvasRef, clearCanvas, eventHandlers };
}

export default useCanvas;
