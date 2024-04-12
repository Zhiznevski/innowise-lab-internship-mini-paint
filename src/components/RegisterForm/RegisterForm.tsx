import { Button, Card, CardContent, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/constants/routes';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

function RegisterForm() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <Card>
      <CardContent>
        <Typography sx={{ marginBottom: 2 }} variant="h5">
          Signup
        </Typography>
        <Typography sx={{ marginBottom: 3 }} variant="body2">
          Already have an account?
          <Link sx={{ marginLeft: 1 }} component={RouterLink} to={LOGIN_ROUTE}>
            LOGIN
          </Link>
        </Typography>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('username')}
            error={false}
            helperText="Please enter your name"
            id="username-input"
            label="Username"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
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
            Sign Up
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default RegisterForm;
