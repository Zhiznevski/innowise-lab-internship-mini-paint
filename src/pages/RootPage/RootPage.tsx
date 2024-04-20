import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase/config';
import { useEffect, useState } from 'react';
import { LOGIN_ROUTE } from '../../utils/constants/routes';
import { CircularProgress, TextField } from '@mui/material';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import useSearchByValue from './useSearchByValue';

function RootPage() {
  const [user, loading] = useAuthState(auth);
  const [searchValue, setSearchValue] = useState('');
  const searchResults = useSearchByValue('images', searchValue);

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
      <TextField
        placeholder="Find by user name"
        value={searchValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
        }}
      />
      <ImageGallery imageData={searchResults} />
    </>
  );
}
export default RootPage;
