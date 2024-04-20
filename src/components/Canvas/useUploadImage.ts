import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '../../services/firebase/config';
import { User } from 'firebase/auth';

function useUploadImage(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  user: User | null | undefined
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const uploadImage = async () => {
    try {
      setIsLoading(true);
      const url = canvasRef.current?.toDataURL();
      const id = uuidv4();
      const storageRef = ref(storage, `images/${id}.png`);
      if (url) {
        const snapshot = await uploadString(storageRef, url, 'data_url');
        const downloadURL = await getDownloadURL(snapshot.ref);
        await addDoc(collection(db, 'images'), {
          imageUrl: downloadURL,
          createAt: new Date(),
          userName: user?.displayName,
          userEmail: user?.email,
        });
        setIsLoading(false);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  return [uploadImage, isLoading, error] as const;
}
export default useUploadImage;
