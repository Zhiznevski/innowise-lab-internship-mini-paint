import { Box, Button, ButtonGroup } from '@mui/material';
import useCanvas from './useCanvas';
import { useAppSelector } from '../../store/store';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { db, storage } from '../../services/firebase/config';

import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { User } from 'firebase/auth';

interface CanvasPropsRef {
  user: User | null | undefined;
}
export const URL =
  'https://cors-anywhere.herokuapp.com/https://i.pinimg.com/564x/ed/a8/e2/eda8e26c050995c78c432709c165e69f.jpg';

function Canvas({ user }: CanvasPropsRef) {
  const [isLoading, setIsLoading] = useState(false);
  const tool = useAppSelector((state) => state.tool.toolValue);
  const toolsColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
  const { canvasRef, clearCanvas, eventHandlers } = useCanvas(toolsColor, penSize, tool);

  const notify = () => {
    toast.success('Image successfully uploaded!');
  };

  const uploadImage = async () => {
    setIsLoading(true);
    const url = canvasRef.current?.toDataURL();
    const id = uuidv4();
    const storageRef = ref(storage, `images/${id}.png`);
    console.log(url);
    if (url) {
      const snapshot = await uploadString(storageRef, url, 'data_url');
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);
      await addDoc(collection(db, 'images'), {
        imageUrl: downloadURL,
        createAt: new Date(),
        userName: user?.displayName,
        userEmail: user?.email,
      });
      setIsLoading(false);
      notify();
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <canvas
          ref={canvasRef}
          height={800}
          width={600}
          style={{
            background: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            cursor: 'crosshair',
            position: 'relative',
            top: 0,
            left: 0,
          }}
          onMouseDown={eventHandlers.mouseDownHandler}
          onMouseUp={eventHandlers.mouseUpHandler}
          onMouseMove={eventHandlers.mouseMoveHandler}
        ></canvas>
        <ButtonGroup sx={{ mt: 2 }} variant="contained" aria-label="Loading button group">
          <Button onClick={clearCanvas}>clear</Button>
          <LoadingButton
            onClick={uploadImage}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            save
          </LoadingButton>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default Canvas;
