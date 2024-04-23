import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tools } from '../constants/tools';

const initialState = Tools.brush;

const toolSlice = createSlice({
  name: 'toolValue',
  initialState: {
    toolValue: initialState,
  },
  reducers: {
    setToolValue(state, action: PayloadAction<Tools>) {
      state.toolValue = action.payload;
    },
  },
});

export default toolSlice.reducer;
export const { setToolValue } = toolSlice.actions;
