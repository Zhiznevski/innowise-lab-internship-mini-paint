import { Button, Card, CardContent, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/constants/routes';
import { useForm } from 'react-hook-form';

interface FormValues {
  email: string;
  password: string;
}

function LoginForm() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Card>
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Login
        </Typography>
        <Typography sx={{ marginBottom: 3 }} variant="body2">
          Don`t have an account?
          <Link sx={{ marginLeft: 1 }} component={RouterLink} to={REGISTRATION_ROUTE}>
            SIGN UP
          </Link>
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('email')}
            error={false}
            helperText="Please enter your email"
            id="email-input"
            label="Email"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
          <TextField
            {...register('password')}
            error={false}
            helperText="Please enter your password"
            id="password-input"
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
          <Button type="submit" sx={{ marginTop: 3 }} fullWidth variant="contained" size="large">
            login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default LoginForm;
