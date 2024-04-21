import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './config';

export const deleteDocument = async (itemId: string) => {
  if (!itemId) return;
  try {
    await deleteDoc(doc(db, 'images', itemId));
  } catch (e) {
    console.error(e);
  }
};
