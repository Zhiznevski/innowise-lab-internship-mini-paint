import { CircularProgress, Container } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';
import { RegistrationForm } from '../../modules/RegistrationForm';

function RegisterPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="xs">
      <RegistrationForm />
    </Container>
  );
}
export default RegisterPage;
