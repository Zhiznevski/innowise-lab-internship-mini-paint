import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './config';
import { addDoc, collection } from 'firebase/firestore';

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  callback: () => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((user) => console.log(user));
  } catch (err) {
    callback();
    console.error(err);
  }
};

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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
