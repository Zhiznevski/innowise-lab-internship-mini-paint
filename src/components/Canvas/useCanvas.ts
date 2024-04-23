import { useEffect, useRef, useState } from 'react';
import { Tools } from '../../constants/tools';

interface Coordinates {
  startX: number;
  startY: number;
}

const LEFT_MOUSE_BUTTON_NUMBER = 1;

function useCanvas(
  lineColor = 'black',
  lineWidth = 5,
  currentTool = Tools.brush,
  editImageLink: string
) {
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

  const pointerDownHandler = (e: React.PointerEvent) => {
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

  const pointerUpHandler = () => {
    setIsMouseDown(false);
  };

  const pointerMoveHandler = (e: React.PointerEvent) => {
    const target = e.target as HTMLCanvasElement;
    const currentX = e.pageX - target.offsetLeft;
    const currentY = e.pageY - target.offsetTop;
    if (!isMouseDown) return;
    if (currentTool === Tools.brush) {
      contextRef.current?.lineTo(currentX, currentY);
      contextRef.current?.stroke();
    } else {
      const img = new Image();
      if (!snapshot) return;
      img.src = snapshot;
      img.onload = () => {
        if (!canvasRef.current) return;
        contextRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current?.height);
        contextRef.current?.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        contextRef.current?.beginPath();

        switch (currentTool) {
          case Tools.line:
            contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
            contextRef.current?.lineTo(currentX, currentY);
            break;
          case Tools.rect:
            contextRef.current?.rect(
              startCoods.startX,
              startCoods.startY,
              currentX - startCoods.startX,
              currentY - startCoods.startY
            );
            break;
          case Tools.circle: {
            const radius = Math.sqrt(
              (currentX - startCoods.startX) ** 2 + (currentY - startCoods.startY) ** 2
            );
            contextRef.current?.arc(startCoods.startX, startCoods.startY, radius, 0, Math.PI * 2);
            break;
          }
        }
        contextRef.current?.stroke();
      };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    contextRef.current = ctx;
  }, [lineColor, lineWidth, contextRef]);

  useEffect(() => {
    if (!editImageLink) return;
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function () {
      canvasRef.current?.getContext('2d')?.drawImage(image, 0, 0);
    };
    image.src = editImageLink;
  }, [editImageLink]);

  const eventHandlers = {
    pointerDownHandler,
    pointerUpHandler,
    pointerMoveHandler,
  };

  return { canvasRef, clearCanvas, eventHandlers };
}

export default useCanvas;
