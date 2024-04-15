import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase/config';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '../../utils/constants/routes';
import { CircularProgress } from '@mui/material';

function RootPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(LOGIN_ROUTE);
    }
  }, [user, navigate]);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Header user={user} />
      <main>
        <Outlet context={user} />
      </main>
    </>
  );
}
export default RootPage;
