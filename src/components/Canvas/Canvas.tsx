import { Box, Button } from '@mui/material';
import useCanvas from './useCanvas';
import { useAppSelector } from '../../store/store';
import { ref, uploadString } from 'firebase/storage';
import { db, storage } from '../../services/firebase/config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

export const URL =
  'https://cors-anywhere.herokuapp.com/https://i.pinimg.com/564x/ed/a8/e2/eda8e26c050995c78c432709c165e69f.jpg';

function Canvas() {
  const tool = useAppSelector((state) => state.tool.toolValue);
  const toolsColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
  const [value] = useCollection(collection(db, 'users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const { canvasRef, clearCanvas, eventHandlers } = useCanvas(toolsColor, penSize, tool);
  console.log(value?.docs.map((el) => el.data()));

  const notify = () => {
    toast.success('Image successfully uploaded!');
  };

  const uploadImage = async () => {
    const url = canvasRef.current?.toDataURL();
    const id = uuidv4();
    const storageRef = ref(storage, `images/${id}.png`);
    console.log(url);
    url &&
      (await uploadString(storageRef, url, 'data_url').then(() => {
        notify();
      }));
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
        <Button onClick={clearCanvas} variant="contained" sx={{ marrginTop: 5 }}>
          clear
        </Button>
        <Button onClick={uploadImage} variant="contained" sx={{ marrginTop: 5 }}>
          save
        </Button>
      </Box>
    </>
  );
}

export default Canvas;
