import { Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginValidationSchemaType, registerValidationSchema } from '../../utils/validation/schema';
import Form from '../../components/Form/Form';

const formInfo = {
  title: 'Login',
  Subtitle: 'Don`t have an account?',
  navigateRoute: '/reg',
  navigateLinkText: 'SIGN UP',
  submitText: 'LOGIN',
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<LoginValidationSchemaType>(registerValidationSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<LoginValidationSchemaType> = (data) => {
    console.log(data);
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
        </Form>
      </form>
    </Container>
  );
}
export default LoginPage;
