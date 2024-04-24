import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/config';
import { LOGIN_ROUTE } from '../../constants/routes';
import { Container } from '@mui/material';
import { ImageGallery } from '../../modules/ImageGallery';
import Spinner from '../../ui/Spinner/Spinner';
import { AppBar } from '../../modules/Appbar';

function RootPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) navigate(LOGIN_ROUTE);

  if (loading) {
    return <Spinner variant="circle" />;
  }

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <AppBar user={user} />
        <ImageGallery user={user} />
      </Container>
    </>
  );
}
export default RootPage;
