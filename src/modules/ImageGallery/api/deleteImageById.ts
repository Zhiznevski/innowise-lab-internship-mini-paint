import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../api/config';
import { deleteObject, ref } from 'firebase/storage';

export const deleteDocument = async (itemId: string, storagePath: string) => {
  if (!itemId) return;
  try {
    await deleteDoc(doc(db, 'images', itemId));
    const desertRef = ref(storage, storagePath);
    await deleteObject(desertRef);
  } catch (e) {
    console.error(e);
  }
};
