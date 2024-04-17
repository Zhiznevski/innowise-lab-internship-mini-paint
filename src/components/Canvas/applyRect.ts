import { MouseDownStateProps, SnapshotStateProps, StartCoordsStateProps } from './chooseTool';

function applyRect(
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
    const { clientX, clientY } = e;
    if (e.buttons !== 1) return;
    setIsMouseDown(true);
    setStartCoords({ startX: clientX, startY: clientY });
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
    setSnapshot(canvasRef.current?.toDataURL());
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;
    const { clientX, clientY } = e;

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
        }
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
        contextRef.current?.lineTo(clientX, clientY);
        contextRef.current?.stroke();
      };
    }

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(startCoods.startX, startCoods.startY);
    contextRef.current?.lineTo(clientX, clientY);
    contextRef.current?.stroke();
  };

  const eventHandlers = {
    mouseDownHandler,
    mouseUpHandler,
    mouseMoveHandler,
  };

  const contextWithTool = contextRef;
  return { contextWithTool, eventHandlers };
}

export default applyRect;
