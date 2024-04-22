import { Button, ButtonGroup, Container, useMediaQuery } from '@mui/material';
import useCanvas from './useCanvas';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { User } from 'firebase/auth';
import useUploadImage from './useUploadImage';
import { deleteDocument } from '../../services/firebase/Documets.service';

interface CanvasPropsRef {
  user: User | null | undefined;
}

function Canvas({ user }: CanvasPropsRef) {
  const editImage = useAppSelector((state) => state.editImage.editImageData);
  const tool = useAppSelector((state) => state.tool.toolValue);
  const toolsColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
  const isMobile = useMediaQuery('(max-width:570px)');
  const isTablet = useMediaQuery('(max-width:780px)');
  const isSmallMobile = useMediaQuery('(max-width:430px)');
  const { canvasRef, clearCanvas, eventHandlers } = useCanvas(
    toolsColor,
    penSize,
    tool,
    editImage.imageUrl
  );
  const [uploadImage, isLoading, error] = useUploadImage(canvasRef, user);

  if (error) toast.error('Image was not loaded');

  const handleUploadButtonClick = async () => {
    await deleteDocument(editImage.itemId);
    await uploadImage();
    toast.success('Image successfully uploaded!');
  };

  const getCanvasSize = () => {
    if (isMobile) {
      return {
        width: 300,
        height: 450,
      };
    }
    if (isTablet) {
      return {
        width: 450,
        height: 600,
      };
    }

    return {
      width: 600,
      height: 750,
    };
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
            upload
          </LoadingButton>
        </ButtonGroup>
        <canvas
          ref={canvasRef}
          height={getCanvasSize().height}
          width={getCanvasSize().width}
          style={{
            alignSelf: 'center',
            background: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            cursor: 'crosshair',
            touchAction: 'none',
            marginLeft: isSmallMobile ? 60 : 0,
          }}
          onPointerMove={eventHandlers.pointerMoveHandler}
          onPointerUp={eventHandlers.pointerUpHandler}
          onPointerDown={eventHandlers.pointerDownHandler}
        ></canvas>
      </Container>
    </>
  );
}

export default Canvas;
