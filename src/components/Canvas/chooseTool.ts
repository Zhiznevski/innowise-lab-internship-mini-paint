import { Coordinates } from './useCanvas';
import applyLine from './applyLine';
import applyBrush from './applyBrush';
import applyRect from './applyRect';
import applyCircle from './applyCircle';

export interface MouseDownStateProps {
  isMouseDown: boolean;
  setIsMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface StartCoordsStateProps {
  startCoods: Coordinates;
  setStartCoords: React.Dispatch<React.SetStateAction<Coordinates>>;
}
export interface SnapshotStateProps {
  snapshot: string | undefined;
  setSnapshot: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function chooseTool(
  toolVariant: string,
  context: React.MutableRefObject<CanvasRenderingContext2D | null>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  mouseDownState: MouseDownStateProps,
  startCoordsState: StartCoordsStateProps,
  snapshotState: SnapshotStateProps
) {
  switch (toolVariant) {
    case 'brush': {
      const { contextWithTool, eventHandlers } = applyBrush(context, mouseDownState);
      return { contextWithTool, eventHandlers };
    }
    case 'line': {
      const { contextWithTool, eventHandlers } = applyLine(
        context,
        canvasRef,
        mouseDownState,
        startCoordsState,
        snapshotState
      );
      return { contextWithTool, eventHandlers };
    }
    case 'rect': {
      const { contextWithTool, eventHandlers } = applyRect(
        context,
        canvasRef,
        mouseDownState,
        startCoordsState,
        snapshotState
      );
      return { contextWithTool, eventHandlers };
    }
    case 'circle': {
      const { contextWithTool, eventHandlers } = applyCircle(
        context,
        canvasRef,
        mouseDownState,
        startCoordsState,
        snapshotState
      );
      return { contextWithTool, eventHandlers };
    }
    default: {
      const { contextWithTool, eventHandlers } = applyBrush(context, mouseDownState);
      return { contextWithTool, eventHandlers };
    }
  }
}

export default chooseTool;
