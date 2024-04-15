import { Button, Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterValidationSchemaType,
  registerValidationSchema,
} from '../../utils/validation/schema';
import Form from '../../components/Form/Form';
import { registerWithEmailAndPassword } from '../../services/firebase/Auth.service';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase/config';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/constants/routes';
import Notification from '../../components/Notification/Notification';

const formInfo = {
  title: 'Signup',
  Subtitle: 'Already have an account?',
  navigateRoute: '/login',
  navigateLinkText: 'LOGIN',
};

function RegisterPage() {
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<RegisterValidationSchemaType>(registerValidationSchema),
    mode: 'onBlur',
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<RegisterValidationSchemaType> = async (data) => {
    await registerWithEmailAndPassword(data.username, data.email, data.password, () => openModal());
  };

  useEffect(() => {
    if (user) {
      navigate(HOME_ROUTE);
    }
  }, [user, navigate]);

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
      <Notification onClose={closeModal} isOpen={isModalOpen}>
        Email is already in use
      </Notification>
    </Container>
  );
}
export default RegisterPage;
