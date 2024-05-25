import { Drawer, Link, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { HOME_ROUTE } from '../../../../constants/routes';
import { iconElements } from '../../constants/iconElements';
import { setToolValue } from '../../store/toolSlice';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../store/store';

const drawerWidth = 60;

const itemStyles = {
  buttonHover: 'rgba(0, 0, 0, 0.1)',
  iconActive: '#2e7d32',
};

export function ShapesPanel() {
  const tool = useAppSelector((state) => state.tool.toolValue);
  const dispatch = useAppDispatch();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        <Link sx={{ marginLeft: 1 }} component={RouterLink} to={HOME_ROUTE}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </Link>
        {iconElements.map((element) => (
          <ListItem
            key={element.id}
            disablePadding
            sx={{ background: tool === element.name ? itemStyles.buttonHover : 'inherit' }}
          >
            <ListItemButton onClick={() => dispatch(setToolValue(element.name))}>
              <ListItemIcon>{element.element}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
