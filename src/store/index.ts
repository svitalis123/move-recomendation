import { create } from 'zustand';
import { createMovieSlice } from './slices/movieSlice';
import { createSearchSlice } from './slices/searchSlice';
import { createUISlice } from './slices/uiSlice';
import { createUserSlice } from './slices/userSlice';

export const useStore = create((...a) => ({
  ...createMovieSlice(...a),
  ...createSearchSlice(...a),
  ...createUISlice(...a),
  ...createUserSlice(...a),
}));