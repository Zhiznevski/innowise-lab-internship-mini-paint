import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import { auth } from '../api/config';
import { ContextType } from '../types/types';

const Root = () => {
  const [user, isLoading] = useAuthState(auth);

  return (
    <div>
      <Outlet context={{ user, isLoading } satisfies ContextType} />
    </div>
  );
};

export default Root;
