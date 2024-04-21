import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase/config';
import { useEffect } from 'react';
import { LOGIN_ROUTE } from '../../utils/constants/routes';
import { CircularProgress, Container } from '@mui/material';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import useSearchByValue from './useSearchByValue';
import { useAppSelector } from '../../store/store';
import { toast } from 'react-toastify';

function RootPage() {
  const [user, loading] = useAuthState(auth);
  const searchValue = useAppSelector((state) => state.searchValue.searchValue);
  const [searchResults, isLoading, error] = useSearchByValue('images', searchValue);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(LOGIN_ROUTE);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error('Something went wrong');
  }, [error]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <Header user={user} />
        <ImageGallery imageData={searchResults} isLoading={isLoading} user={user} />
      </Container>
    </>
  );
}
export default RootPage;
