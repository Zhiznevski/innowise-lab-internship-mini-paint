import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../api/config';

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  callback: () => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    callback();
    console.error(err);
  }
};
