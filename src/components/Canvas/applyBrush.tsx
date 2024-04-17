import { MouseDownStateProps } from './chooseTool';

function applyBrush(
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  mouseDownState: MouseDownStateProps
) {
  const { isMouseDown, setIsMouseDown } = mouseDownState;

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    setIsMouseDown(true);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(clientX, clientY);
  };

  const mouseUpHandler = () => {
    contextRef.current?.closePath();
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;
    const { clientX, clientY } = e;
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

export default applyBrush;
