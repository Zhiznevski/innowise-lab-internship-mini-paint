import { Drawer, Link, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop54Icon from '@mui/icons-material/Crop54';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { HOME_ROUTE } from '../../utils/constants/routes';

const iconElements = [
  {
    id: 0,
    name: 'brush',
    element: <BrushIcon />,
  },
  {
    id: 1,
    name: 'circle',
    element: <PanoramaFishEyeIcon />,
  },
  {
    id: 2,
    name: 'rect',
    element: <HorizontalRuleIcon />,
  },
  {
    id: 3,
    name: 'line',
    element: <Crop54Icon />,
  },
];

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
          {iconElements.map((element) => (
            <ListItem key={element.id} disablePadding>
              <ListItemButton sx={{}} onClick={(e) => console.log(e)}>
                <ListItemIcon>{element.element}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default ToolsPanel;
