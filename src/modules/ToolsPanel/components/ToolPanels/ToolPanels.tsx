import { useMediaQuery } from '@mui/material';

import { BrushPanel } from '../BrushPanel/BrushPanel';
import { ShapesPanel } from '../ShapesPanel/ShapesPanel';

export function ToolPanels() {
  const isLaptop = useMediaQuery('(min-width:1100px)');

  return (
    <>
      <ShapesPanel />
      <BrushPanel isLaptop={isLaptop} />
    </>
  );
}
