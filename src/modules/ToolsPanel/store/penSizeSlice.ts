import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = 3;
const penSizeSlice = createSlice({
  name: 'penSizeValue',
  initialState: {
    penSizeValue: initialState,
  },
  reducers: {
    setPenSizeValue(state, action: PayloadAction<number>) {
      state.penSizeValue = action.payload;
    },
  },
});

export default penSizeSlice.reducer;
export const { setPenSizeValue } = penSizeSlice.actions;
