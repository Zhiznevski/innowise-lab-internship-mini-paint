import { Button, ButtonGroup, Container } from '@mui/material';
import useCanvas from './useCanvas';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { User } from 'firebase/auth';
import useUploadImage from './useUploadImage';
import { deleteDocument } from '../../services/firebase/Documets.servise';
import { initialEditImageState, setEditImageData } from '../../store/editImageSlice';

interface CanvasPropsRef {
  user: User | null | undefined;
}

function Canvas({ user }: CanvasPropsRef) {
  const editImage = useAppSelector((state) => state.editImage.editImageData);
  const dispatch = useAppDispatch();
  const tool = useAppSelector((state) => state.tool.toolValue);
  const toolsColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
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
    dispatch(setEditImageData(initialEditImageState));
    clearCanvas();
  };

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {editImage.imageUrl && `EDIT MODE FOR ${editImage.imageUrl}`}
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
