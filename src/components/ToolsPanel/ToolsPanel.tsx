import {
  Container,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Slider,
} from '@mui/material';
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
import { setToolColorValue } from '../../store/toolColorSlice';
import { HexColorPicker } from 'react-colorful';
import { setPenSizeValue } from '../../store/penSizeSlice';

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
  const toolColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);

  const dispatch = useAppDispatch();

  const colorPickerHandleChange = (color: string) => {
    dispatch(setToolColorValue(color));
  };

  const penSizeHandleChange = (_: Event, newValue: number | number[]) => {
    dispatch(setPenSizeValue(newValue as number));
  };

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
      <Drawer
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            overflowX: 'hidden',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Container sx={{ paddingTop: 5 }}>
          <HexColorPicker color={toolColor} onChange={colorPickerHandleChange} />
          <Slider aria-label="brush-size" value={penSize} onChange={penSizeHandleChange} />
        </Container>
      </Drawer>
    </>
  );
}

export default ToolsPanel;
