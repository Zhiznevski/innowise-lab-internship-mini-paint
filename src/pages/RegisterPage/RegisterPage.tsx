import { Button, Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterValidationSchemaType,
  registerValidationSchema,
} from '../../utils/validation/schema';
import Form from '../../components/Form/Form';
import { registerWithEmailAndPassword } from '../../services/firebase/Auth.service';

const formInfo = {
  title: 'Signup',
  Subtitle: 'Already have an account?',
  navigateRoute: '/login',
  navigateLinkText: 'LOGIN',
};

function RegisterPage() {
  // const [user, loading, error] = useAuthState(auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<RegisterValidationSchemaType>(registerValidationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterValidationSchemaType> = async (data) => {
    await registerWithEmailAndPassword(data.username, data.email, data.password);
  };

  return (
    <Container maxWidth="xs">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form formInfo={formInfo}>
          <TextField
            {...register('username')}
            aria-invalid={!!errors.username}
            error={!!errors.username?.message}
            helperText={errors.username?.message ?? ' '}
            id="username-input"
            label="Username"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
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
            disabled={
              !!errors.password?.message || !!errors.email?.message || !!errors.username?.message
            }
            type="submit"
            sx={{ marginTop: 3 }}
            fullWidth
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
        </Form>
      </form>
    </Container>
  );
}
export default RegisterPage;
