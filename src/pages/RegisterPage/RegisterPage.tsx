import { Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterValidationSchemaType,
  registerValidationSchema,
} from '../../utils/validation/schema';
import Form from '../../components/Form/Form';

const formInfo = {
  title: 'Signup',
  Subtitle: 'Already have an account?',
  navigateRoute: '/login',
  navigateLinkText: 'LOGIN',
  submitText: 'Sign Up',
};

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<RegisterValidationSchemaType>(registerValidationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterValidationSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xs">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form formInfo={formInfo}>
          <TextField
            {...register('username')}
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
            error={!!errors.password?.message}
            helperText={errors.password?.message ?? ' '}
            id="password-input"
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
        </Form>
      </form>
    </Container>
  );
}
export default RegisterPage;
