import { MouseDownStateProps, SnapshotStateProps, StartCoordsStateProps } from './chooseTool';

function applyCircle(
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  mouseDownState: MouseDownStateProps,
  startCoordsState: StartCoordsStateProps,
  snapshotStateProps: SnapshotStateProps
) {
  const { isMouseDown, setIsMouseDown } = mouseDownState;
  const { startCoods, setStartCoords } = startCoordsState;
  const { snapshot, setSnapshot } = snapshotStateProps;

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const target = e.target as HTMLCanvasElement;
    if (e.buttons !== 1) return;
    setIsMouseDown(true);
    contextRef.current?.beginPath();
    setStartCoords({ startX: e.pageX - target.offsetLeft, startY: e.pageY - target.offsetTop });
    contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
    setSnapshot(canvasRef.current?.toDataURL());
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (isMouseDown) {
      const target = e.target as HTMLCanvasElement;
      const img = new Image();
      if (snapshot) {
        img.src = snapshot;
        img.onload = () => {
          if (canvasRef.current) {
            contextRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current?.height);
            contextRef.current?.drawImage(
              img,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            contextRef.current?.beginPath();
            const radius = Math.sqrt(
              (e.pageX - target.offsetLeft - startCoods.startX) ** 2 +
                (e.pageY - target.offsetTop - startCoods.startY) ** 2
            );
            contextRef.current?.arc(startCoods.startX, startCoods.startY, radius, 0, Math.PI * 2);
            contextRef.current?.stroke();
          }
        };
      }
    }
  };

  const eventHandlers = {
    mouseDownHandler,
    mouseUpHandler,
    mouseMoveHandler,
  };

  const contextWithTool = contextRef;
  return { contextWithTool, eventHandlers };
}

export default applyCircle;
