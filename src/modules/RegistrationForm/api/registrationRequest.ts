import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../api/config';

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  callback: () => void
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    await updateProfile(user, { displayName: name });
  } catch (err) {
    callback();
    console.error(err);
  }
};
