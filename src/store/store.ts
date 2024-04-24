import { configureStore } from '@reduxjs/toolkit';
import toolSlice from '../modules/ToolsPanel/store/toolSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import toolColorSlice from '../modules/ToolsPanel/store/toolColorSlice';
import penSizeSlice from '../modules/ToolsPanel/store/penSizeSlice';
import { searchValueReducer } from '../modules/Appbar';
import { editImageReducer } from '../modules/ImageGallery';

export const store = configureStore({
  reducer: {
    tool: toolSlice,
    toolColor: toolColorSlice,
    penSize: penSizeSlice,
    searchValue: searchValueReducer,
    editImage: editImageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
