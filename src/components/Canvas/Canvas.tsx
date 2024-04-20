import { Button, ButtonGroup, Container } from '@mui/material';
import useCanvas from './useCanvas';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { User } from 'firebase/auth';
import useUploadImage from './useUploadImage';

interface CanvasPropsRef {
  user: User | null | undefined;
}

export const URL =
  'https://cors-anywhere.herokuapp.com/https://i.pinimg.com/564x/ed/a8/e2/eda8e26c050995c78c432709c165e69f.jpg';

function Canvas({ user }: CanvasPropsRef) {
  const tool = useAppSelector((state) => state.tool.toolValue);
  const toolsColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
  const { canvasRef, clearCanvas, eventHandlers } = useCanvas(toolsColor, penSize, tool);
  const [uploadImage, isLoading, error] = useUploadImage(canvasRef, user);

  if (error) toast.error('Image was not loaded');

  const handleUploadButtonClick = async () => {
    await uploadImage();
    toast.success('Image successfully uploaded!');
  };

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ButtonGroup sx={{ mb: 1 }} variant="contained" aria-label="Loading button group">
          <Button onClick={clearCanvas}>clear</Button>
          <LoadingButton
            onClick={handleUploadButtonClick}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            save
          </LoadingButton>
        </ButtonGroup>
        <canvas
          ref={canvasRef}
          height={800}
          width={600}
          style={{
            alignSelf: 'center',
            background: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            cursor: 'crosshair',
          }}
          onMouseDown={eventHandlers.mouseDownHandler}
          onMouseUp={eventHandlers.mouseUpHandler}
          onMouseMove={eventHandlers.mouseMoveHandler}
        ></canvas>
      </Container>
    </>
  );
}

export default Canvas;
