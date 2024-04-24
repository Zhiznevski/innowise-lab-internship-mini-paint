import { Tools } from '../../../constants/tools';
import BrushIcon from '@mui/icons-material/Brush';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import Crop54Icon from '@mui/icons-material/Crop54';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

export const iconElements = [
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
