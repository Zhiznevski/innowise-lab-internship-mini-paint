import { Container } from '@mui/material';
import { ImageGallery } from '../../modules/ImageGallery';
import Spinner from '../../ui/Spinner/Spinner';
import { AppBar } from '../../modules/Appbar';
import { useUser } from '../../hooks/useUser';

function RootPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
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
