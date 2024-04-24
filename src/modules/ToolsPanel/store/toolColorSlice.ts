import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '#000000';
const toolColorSlice = createSlice({
  name: 'toolValue',
  initialState: {
    toolColorValue: initialState,
  },
  reducers: {
    setToolColorValue(state, action: PayloadAction<string>) {
      state.toolColorValue = action.payload;
    },
  },
});

export default toolColorSlice.reducer;
export const { setToolColorValue } = toolColorSlice.actions;
