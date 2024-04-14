import { Button, Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LoginValidationSchemaType, loginValidationSchema } from '../../utils/validation/schema';
import Form from '../../components/Form/Form';
import { auth } from '../../services/firebase/config';
import { logInWithEmailAndPassword } from '../../services/firebase/Auth.service';
import { useState } from 'react';
import Notification from '../../components/Notification/Notification';

const formInfo = {
  title: 'Login',
  Subtitle: 'Don`t have an account?',
  navigateRoute: '/reg',
  navigateLinkText: 'SIGN UP',
};

function LoginPage() {
  const [error] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<LoginValidationSchemaType>(loginValidationSchema),
    mode: 'onBlur',
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<LoginValidationSchemaType> = async (data) => {
    await logInWithEmailAndPassword(data.email, data.password, openModal);
  };

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
      <Notification onClose={closeModal} isOpen={isModalOpen}>
        Invalid authorization data
      </Notification>
    </Container>
  );
}
export default LoginPage;
