import { Box, Button } from '@mui/material';
import { useEffect, useRef } from 'react';

interface CanvasPropstype {
  width: number;
  height: number;
}

export const URL =
  'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&w=200&fit=max';

function Canvas({ width = 500, height = 500 }: CanvasPropstype) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 500, 500);
      };
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
