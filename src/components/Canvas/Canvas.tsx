import { Box, Button } from '@mui/material';
import { useEffect, useRef } from 'react';

interface CanvasPropstype {
  width: number;
  height: number;
}

function Canvas({ width = 500, height = 500 }: CanvasPropstype) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawLine = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    counterclockwise?: boolean | undefined
  ) => {
    ctx.beginPath();
    ctx.arc(startX, startY, radius, startAngle, endAngle, counterclockwise);
    ctx.stroke();
  };

  const drawRect = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    width: number,
    height: number
  ) => {
    ctx.fillRect(startX, startY, width, height);
  };

  const clearCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const clearButtonHandler = () => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      clearCanvas(ctx);
    }
  };
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      drawLine(ctx, 100, 10, 10, 10);
      drawCircle(ctx, 100, 10, 10, 0, 0);
      drawRect(ctx, 100, 10, 10, 10);
    }
  }, []);
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas
          ref={canvasRef}
          style={{ background: '#fff' }}
          height={height}
          width={width}
        ></canvas>
        <Button onClick={clearButtonHandler} variant="contained">
          clear
        </Button>
      </Box>
    </>
  );
}

export default Canvas;
