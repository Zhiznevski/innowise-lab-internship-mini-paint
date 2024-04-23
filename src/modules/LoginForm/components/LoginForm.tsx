import { Button, Container, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { formInfo } from '../constants/constants';
import { LoginValidationSchemaType, loginValidationSchema } from '../helpers/validateForm';
import Form from '../../../components/Form/Form';
import { logInWithEmailAndPassword } from '../api/loginRequest';

export function LoginForm() {
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
          <Button type="submit" sx={{ marginTop: 3 }} fullWidth variant="contained" size="large">
            LOGIN
          </Button>
        </Form>
      </form>
    </Container>
  );
}
