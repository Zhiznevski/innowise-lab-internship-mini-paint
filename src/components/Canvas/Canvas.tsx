import { Box, Button } from '@mui/material';
import useCanvas from './useCanvas';

export const URL =
  'https://cors-anywhere.herokuapp.com/https://i.pinimg.com/564x/ed/a8/e2/eda8e26c050995c78c432709c165e69f.jpg';

function Canvas() {
  const { canvasRef, clearCanvas, eventHandlers } = useCanvas();
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas
          ref={canvasRef}
          height={900}
          width={650}
          style={{ background: '#fff', cursor: 'crosshair', position: 'relative', top: 0, left: 0 }}
          onMouseDown={eventHandlers.mouseDownHandler}
          onMouseUp={eventHandlers.mouseUpHandler}
          onMouseMove={eventHandlers.mouseMoveHandler}
        ></canvas>
        <Button onClick={clearCanvas} variant="contained">
          clear
        </Button>
      </Box>
    </>
  );
}

export default Canvas;
