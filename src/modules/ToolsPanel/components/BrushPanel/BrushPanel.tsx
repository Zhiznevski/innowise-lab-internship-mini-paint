import { Drawer, Container, Slider } from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { penWidth } from '../../constants/penWidth';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { setToolColorValue } from '../../store/toolColorSlice';
import { setPenSizeValue } from '../../store/penSizeSlice';

interface BrushPanelPropsType {
  isLaptop: boolean;
}

export function BrushPanel({ isLaptop }: BrushPanelPropsType) {
  const dispatch = useAppDispatch();
  const toolColor = useAppSelector((state) => state.toolColor.toolColorValue);
  const penSize = useAppSelector((state) => state.penSize.penSizeValue);
  const colorPickerHandleChange = (color: string) => {
    dispatch(setToolColorValue(color));
  };

  const penSizeHandleChange = (_: Event, newValue: number | number[]) => {
    dispatch(setPenSizeValue(newValue as number));
  };
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          overflowX: 'hidden',
        },
      }}
      variant="permanent"
      anchor={isLaptop ? 'right' : 'bottom'}
    >
      <Container
        sx={{
          pt: 2,
          pb: 1,
          alignItems: 'center',
          display: 'flex',
          flexDirection: isLaptop ? 'column' : 'row',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <HexColorPicker
          style={{ maxWidth: '180px' }}
          color={toolColor}
          onChange={colorPickerHandleChange}
        />
        <Slider
          sx={{ mt: 5, maxWidth: '180px' }}
          defaultValue={3}
          marks={penWidth}
          min={1}
          max={12}
          aria-label="pen-size"
          value={penSize}
          onChange={penSizeHandleChange}
        />
      </Container>
    </Drawer>
  );
}
