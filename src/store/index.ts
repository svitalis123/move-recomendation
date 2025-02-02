// src/store/index.ts
import { create } from 'zustand';
import { createMovieSlice } from './slices/movieSlice';
import { createSearchSlice } from './slices/searchSlice';
import { createUISlice } from './slices/uiSlice';
import { createUserSlice } from './slices/userSlice';
import { createReviewSlice } from './slices/reviewSlice';
import type { StoreState } from './types';
import { createGenreSlice } from './slices/genreSlice';

export const useStore = create<StoreState>((...a) => ({
  ...createMovieSlice(...a),
  ...createSearchSlice(...a),
  ...createUISlice(...a),
  ...createUserSlice(...a),
  ...createReviewSlice(...a),
  ...createGenreSlice(...a),
}));