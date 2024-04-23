import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ImageListItemType } from '../components/ImageGallery/ImageGallery';

export const initialEditImageState: ImageListItemType = {
  itemId: '',
  userEmail: '',
  userName: '',
  imageUrl: '',
  createdAt: new Date(),
  storagePath: '',
};

const editImageSlice = createSlice({
  name: 'editImageData',
  initialState: {
    editImageData: initialEditImageState,
  },
  reducers: {
    setEditImageData(state, action: PayloadAction<ImageListItemType>) {
      state.editImageData = action.payload;
    },
  },
});

export default editImageSlice.reducer;
export const { setEditImageData } = editImageSlice.actions;
