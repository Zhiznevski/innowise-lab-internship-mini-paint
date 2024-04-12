import { Button, Card, CardContent, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/constants/routes';

function LoginForm() {
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
        <form>
          <TextField
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
            error={false}
            helperText="Please enter your password"
            id="password-input"
            label="Password"
            variant="outlined"
            size="small"
            margin="dense"
            fullWidth
          />
          <Button sx={{ marginTop: 3 }} disabled={false} fullWidth variant="contained" size="large">
            login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default LoginForm;
