import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storage, db } from '../../services/firebase/config';
import { User } from 'firebase/auth';
import { ImageListItemType } from '../ImageGallery/ImageGallery';

function useUploadImage(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  user: User | null | undefined,
  listItem: ImageListItemType
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const uploadImage = async () => {
    try {
      setIsLoading(true);
      const url = canvasRef.current?.toDataURL();
      const id = uuidv4();
      const storageRef = ref(storage, `images/${id}.png`);
      if (!url) return;
      const snapshot = await uploadString(storageRef, url, 'data_url');
      const downloadURL = await getDownloadURL(snapshot.ref);
      if (!listItem.imageUrl) {
        await addDoc(collection(db, 'images'), {
          imageUrl: downloadURL,
          createAt: new Date(),
          userName: user?.displayName,
          userEmail: user?.email,
          storagePath: `images/${id}.png`,
        });
      } else {
        await updateDoc(doc(db, 'images', listItem.itemId), {
          imageUrl: downloadURL,
          createAt: new Date(),
        });
      }
      setIsLoading(false);
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  return [uploadImage, isLoading, error] as const;
}
export default useUploadImage;
