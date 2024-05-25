import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../constants/routes';
import { LoginForm } from '../../modules/LoginForm';
import Spinner from '../../ui/Spinner/Spinner';
import { useUser } from '../../hooks/useUser';

function LoginPage() {
  const { user, isLoading } = useUser();

  if (user) return <Navigate to={HOME_ROUTE} />;

  if (isLoading) {
    return <Spinner variant="circle" />;
  }

  return (
    <Container maxWidth="xs">
      <LoginForm />
    </Container>
  );
}
export default LoginPage;
