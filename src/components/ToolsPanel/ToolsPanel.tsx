import { Drawer, Link, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop54Icon from '@mui/icons-material/Crop54';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { HOME_ROUTE } from '../../utils/constants/routes';

const drawerWidth = 65;

function ToolsPanel() {
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <Link sx={{ marginLeft: 1 }} component={RouterLink} to={HOME_ROUTE}>
            <ListItem disablePadding>
              <ListItemButton onClick={(e) => console.log(e)}>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => console.log(e)}>
              <ListItemIcon>
                <BrushIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => console.log(e)}>
              <ListItemIcon>
                <PanoramaFishEyeIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => console.log(e)}>
              <ListItemIcon>
                <Crop54Icon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => console.log(e)}>
              <ListItemIcon>
                <HorizontalRuleIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default ToolsPanel;
