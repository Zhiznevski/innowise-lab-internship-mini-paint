import { useEffect, useRef, useState } from 'react';

interface Coordinates {
  startX: number;
  startY: number;
}

enum Tools {
  brush = 'brush',
  line = 'line',
  rect = 'rect',
  circle = 'circle',
}

type ToolType = keyof typeof Tools;

const LEFT_MOUSE_BUTTON_NUMBER = 1;

function useCanvas(lineColor = 'black', lineWidth = 5, currentTool: ToolType = 'brush') {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startCoods, setStartCoords] = useState<Coordinates>({ startX: 0, startY: 0 });
  const [snapshot, setSnapshot] = useState<string | undefined>('');

  const clearCanvas = () => {
    if (contextRef.current && canvasRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    }
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.buttons !== LEFT_MOUSE_BUTTON_NUMBER) return;
    const target = e.target as HTMLCanvasElement;
    const startX = e.pageX - target.offsetLeft;
    const startY = e.pageY - target.offsetTop;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(startX, startY);
    setStartCoords({ startX: startX, startY: startY });
    setSnapshot(canvasRef.current?.toDataURL());
    setIsMouseDown(true);
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const target = e.target as HTMLCanvasElement;
    const currentX = e.pageX - target.offsetLeft;
    const currentY = e.pageY - target.offsetTop;
    if (isMouseDown) {
      if (currentTool === Tools.brush) {
        contextRef.current?.lineTo(currentX, currentY);
        contextRef.current?.stroke();
      } else {
        const img = new Image();
        if (snapshot) {
          img.src = snapshot;
          img.onload = () => {
            if (canvasRef.current) {
              contextRef.current?.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current?.height
              );
              contextRef.current?.drawImage(
                img,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              contextRef.current?.beginPath();

              if (currentTool === Tools.line) {
                contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
                contextRef.current?.lineTo(currentX, currentY);
              }

              if (currentTool === Tools.rect) {
                contextRef.current?.rect(
                  startCoods.startX,
                  startCoods.startY,
                  currentX - startCoods.startX,
                  currentY - startCoods.startY
                );
              }

              if (currentTool === Tools.circle) {
                const radius = Math.sqrt(
                  (currentX - startCoods.startX) ** 2 + (currentY - startCoods.startY) ** 2
                );
                contextRef.current?.arc(
                  startCoods.startX,
                  startCoods.startY,
                  radius,
                  0,
                  Math.PI * 2
                );
              }
              contextRef.current?.stroke();
            }
          };
        }
      }
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
      contextRef.current = ctx;
    }
  }, [lineColor, lineWidth, contextRef]);

  const eventHandlers = {
    mouseDownHandler,
    mouseUpHandler,
    mouseMoveHandler,
  };

  return { canvasRef, clearCanvas, eventHandlers };
}

export default useCanvas;
