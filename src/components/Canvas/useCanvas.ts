import { useEffect, useRef, useState } from 'react';
import chooseTool from './chooseTool';

export interface Coordinates {
  startX: number;
  startY: number;
}

function useCanvas(lineColor = 'black', lineWidth = 5) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCoods, setStartCoords] = useState<Coordinates>({ startX: 0, startY: 0 });
  const [snapshot, setSnapshot] = useState<string | undefined>('');
  const { contextWithTool, eventHandlers } = chooseTool(
    'circle',
    contextRef,
    canvasRef,
    { isMouseDown, setIsMouseDown },
    { startCoods, setStartCoords },
    { snapshot, setSnapshot }
  );

  const clearCanvas = () => {
    if (contextWithTool.current && canvasRef.current) {
      contextWithTool.current.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 600;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
      }
      contextWithTool.current = ctx;
    }
  }, [lineColor, lineWidth, contextWithTool]);

  return { canvasRef, clearCanvas, eventHandlers };
}

export default useCanvas;
