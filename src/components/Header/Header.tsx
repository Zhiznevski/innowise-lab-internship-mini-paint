import { AppBar, IconButton, Toolbar } from '@mui/material';
import { User } from 'firebase/auth';
import { logout } from '../../services/firebase/Auth.service';
import { Logout } from '@mui/icons-material';
import PaletteIcon from '@mui/icons-material/Palette';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { EDITOR_ROUTE } from '../../utils/constants/routes';
import SearchBar from '../SearchBar/SearchBar';
import { useAppDispatch } from '../../store/store';
import { initialEditImageState, setEditImageData } from '../../store/editImageSlice';

interface HeaderPropsType {
  user: User | null | undefined;
}

function Header({ user }: HeaderPropsType) {
  const dispatch = useAppDispatch();
  const logoutHandleClick = async () => {
    await logout();
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {user && (
            <>
              <Link
                onClick={() => dispatch(setEditImageData(initialEditImageState))}
                component={RouterLink}
                to={EDITOR_ROUTE}
              >
                <IconButton
                  size="large"
                  aria-label="logout from account"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  sx={{ marginLeft: 'auto', color: '#fff' }}
                >
                  <PaletteIcon />
                </IconButton>
              </Link>
              <SearchBar />
              <IconButton
                onClick={logoutHandleClick}
                size="large"
                aria-label="logout from account"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                sx={{ marginLeft: 'auto' }}
              >
                <Logout />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Header;
