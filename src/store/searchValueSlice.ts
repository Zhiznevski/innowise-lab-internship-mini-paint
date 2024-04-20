import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = '';
const searchValueSlice = createSlice({
  name: 'searchValue',
  initialState: {
    searchValue: initialState,
  },
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
  },
});

export default searchValueSlice.reducer;
export const { setSearchValue } = searchValueSlice.actions;
