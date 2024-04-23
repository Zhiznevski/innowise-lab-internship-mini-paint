import { Container } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../api/config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';
import { LoginForm } from '../../modules/LoginForm';
import Spinner from '../../ui/Spinner/Spinner';

function LoginPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

  if (loading) {
    return <Spinner variant="circle" />;
  }

  return (
    <Container maxWidth="xs">
      <LoginForm />
    </Container>
  );
}
export default LoginPage;
