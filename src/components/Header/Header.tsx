import { AppBar, IconButton, Toolbar } from '@mui/material';
import { User } from 'firebase/auth';
import { logout } from '../../services/firebase/Auth.service';
import { Logout } from '@mui/icons-material';

interface HeaderPropsType {
  user: User | null | undefined;
}

function Header({ user }: HeaderPropsType) {
  const logoutHandleClick = async () => {
    await logout();
  };

  return (
    <>
      <AppBar position="static" color="secondary">
        <Toolbar>
          {user && (
            <IconButton
              onClick={logoutHandleClick}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              sx={{ marginLeft: 'auto' }}
            >
              <Logout />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
