import { AppBar as Header, IconButton, Toolbar } from '@mui/material';
import { User } from 'firebase/auth';
import { logout } from '../../api/logoutUser';
import { Logout } from '@mui/icons-material';
import PaletteIcon from '@mui/icons-material/Palette';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { EDITOR_ROUTE } from '../../../../constants/routes';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { useAppDispatch } from '../../../../store/store';
import { setEditImageData } from '../../../ImageGallery/store/editImageSlice';

interface HeaderPropsType {
  user: User | null | undefined;
}

export function AppBar({ user }: HeaderPropsType) {
  const dispatch = useAppDispatch();

  const logoutHandleClick = async () => {
    await logout();
  };

  return (
    <>
      <Header position="static" color="primary">
        <Toolbar>
          {user && (
            <>
              <Link
                onClick={() =>
                  dispatch(
                    setEditImageData({
                      itemId: '',
                      userEmail: '',
                      userName: '',
                      imageUrl: '',
                      createdAt: new Date(),
                      storagePath: '',
                    })
                  )
                }
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
      </Header>
    </>
  );
}
