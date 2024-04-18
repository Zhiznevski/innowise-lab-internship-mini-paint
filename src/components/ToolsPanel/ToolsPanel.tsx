import { Drawer, Link, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop54Icon from '@mui/icons-material/Crop54';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { HOME_ROUTE } from '../../utils/constants/routes';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setToolValue } from '../../store/toolSlice';
import { Tools } from '../../utils/constants/tools';

const iconElements = [
  {
    id: 0,
    name: Tools.brush,
    element: <BrushIcon />,
  },
  {
    id: 1,
    name: Tools.circle,
    element: <PanoramaFishEyeIcon />,
  },
  {
    id: 2,
    name: Tools.rect,
    element: <Crop54Icon />,
  },
  {
    id: 3,
    name: Tools.line,
    element: <HorizontalRuleIcon />,
  },
];

const itemStyles = {
  buttonHover: 'rgba(0, 0, 0, 0.1)',
  iconActive: '#2e7d32',
};

const drawerWidth = 60;

function ToolsPanel() {
  const tool = useAppSelector((state) => state.tool.toolValue);
  console.log(tool);
  const dispatch = useAppDispatch();

  return (
    <>
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
            <ListItem key={element.id} disablePadding>
              <ListItemButton
                sx={{ backgroundColor: tool === element.name ? itemStyles.buttonHover : '' }}
                onClick={() => dispatch(setToolValue(element.name))}
              >
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
