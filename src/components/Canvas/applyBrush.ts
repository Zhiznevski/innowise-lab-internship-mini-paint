import { MouseDownStateProps } from './chooseTool';

function applyBrush(
  contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>,
  mouseDownState: MouseDownStateProps
) {
  const { isMouseDown, setIsMouseDown } = mouseDownState;

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (e.buttons !== 1) return;
    setIsMouseDown(true);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(
      e.pageX - e.currentTarget.offsetLeft,
      e.pageY - e.currentTarget.offsetTop
    );
  };

  const mouseUpHandler = () => {
    setIsMouseDown(false);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isMouseDown) return;
    contextRef.current?.lineTo(
      e.pageX - e.currentTarget.offsetLeft,
      e.pageY - e.currentTarget.offsetTop
    );
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
