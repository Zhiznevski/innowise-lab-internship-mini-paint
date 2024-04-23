import { configureStore } from '@reduxjs/toolkit';
import toolSlice from './toolSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import toolColorSlice from './toolColorSlice';
import penSizeSlice from './penSizeSlice';
import searchValueSlice from './searchValueSlice';
import { editImageReducer } from '../modules/ImageGallery';

export const store = configureStore({
  reducer: {
    tool: toolSlice,
    toolColor: toolColorSlice,
    penSize: penSizeSlice,
    searchValue: searchValueSlice,
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
