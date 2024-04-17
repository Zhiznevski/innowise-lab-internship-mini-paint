import { useEffect, useRef, useState } from 'react';

export interface Coordinates {
  startX: number;
  startY: number;
}

type CurrentToolsType = 'brush' | 'line' | 'rect' | 'circle';

function useCanvas(lineColor = 'black', lineWidth = 5, currentTool: CurrentToolsType = 'line') {
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
    const target = e.target as HTMLCanvasElement;
    if (e.buttons !== 1) return;
    contextRef.current?.beginPath();
    setStartCoords({ startX: e.pageX - target.offsetLeft, startY: e.pageY - target.offsetTop });
    contextRef.current?.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
    setSnapshot(canvasRef.current?.toDataURL());
    setIsMouseDown(true);
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isMouseDown) {
      const target = e.target as HTMLCanvasElement;
      if (currentTool === 'brush') {
        contextRef.current?.lineTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
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

              if (currentTool === 'line') {
                contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
                contextRef.current?.lineTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
              }

              if (currentTool === 'rect') {
                contextRef.current?.rect(
                  startCoods.startX,
                  startCoods.startY,
                  e.pageX - target.offsetLeft - startCoods.startX,
                  e.pageY - target.offsetTop - startCoods.startY
                );
              }

              if (currentTool === 'circle') {
                const radius = Math.sqrt(
                  (e.pageX - target.offsetLeft - startCoods.startX) ** 2 +
                    (e.pageY - target.offsetTop - startCoods.startY) ** 2
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
