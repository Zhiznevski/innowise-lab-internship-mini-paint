import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { registerWithEmailAndPassword } from '../api/registrationRequest';
import { formInfo } from '../constants/constants';
import { RegisterValidationSchemaType, registerValidationSchema } from '../helpers/validateForm';
import Form from '../../../components/Form/Form';
import { toast } from 'react-toastify';

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<RegisterValidationSchemaType>(registerValidationSchema),
  });

  const notify = () => {
    toast.error('Email is already in use');
  };

  const onSubmit: SubmitHandler<RegisterValidationSchemaType> = async (data) => {
    await registerWithEmailAndPassword(data.username, data.email, data.password, notify);
  };

  return (
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
        <Button type="submit" sx={{ marginTop: 3 }} fullWidth variant="contained" size="large">
          Sign Up
        </Button>
      </Form>
    </form>
  );
}
