import { Button, CircularProgress, Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginValidationSchemaType, loginValidationSchema } from '../../utils/validation/schema';
import Form from '../../components/Form/Form';
import { auth } from '../../services/firebase/config';
import { logInWithEmailAndPassword } from '../../services/firebase/Auth.service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/constants/routes';
import { toast } from 'react-toastify';

const formInfo = {
  title: 'Login',
  Subtitle: 'Don`t have an account?',
  navigateRoute: '/reg',
  navigateLinkText: 'SIGN UP',
};

function LoginPage() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<LoginValidationSchemaType>(loginValidationSchema),
    mode: 'onBlur',
  });

  const notify = () => {
    toast.error('Invalid authorization data');
  };

  const onSubmit: SubmitHandler<LoginValidationSchemaType> = async (data) => {
    await logInWithEmailAndPassword(data.email, data.password, notify);
  };

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
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form formInfo={formInfo}>
          <TextField
            {...register('email')}
            aria-invalid={!!errors.email}
            error={!!errors.email?.message}
            helperText={errors.email?.message ?? ' '}
            id="email-input"
            label="Email"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
          <TextField
            {...register('password')}
            aria-invalid={!!errors.password}
            error={!!errors.password?.message}
            helperText={errors.password?.message ?? ' '}
            id="password-input"
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
          <Button
            disabled={!!errors.password?.message || !!errors.email?.message}
            type="submit"
            sx={{ marginTop: 3 }}
            fullWidth
            variant="contained"
            size="large"
          >
            LOGIN
          </Button>
        </Form>
      </form>
    </Container>
  );
}
export default LoginPage;
