import { signOut } from 'firebase/auth';
import { auth } from '../../api/config';

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};
