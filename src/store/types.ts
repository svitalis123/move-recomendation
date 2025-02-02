// src/store/types.ts
import type { MovieSlice, MovieActions } from './slices/movieSlice';
import type { SearchSlice } from './slices/searchSlice';
import type { UISlice, UIActions } from './slices/uiSlice';
import type { UserSlice, UserActions } from './slices/userSlice';
import type { ReviewSlice } from './slices/reviewSlice';
import { GenreSlice } from './slices/genreSlice';

export type StoreState = 
  MovieSlice & 
  MovieActions & 
  SearchSlice & 
  UISlice & 
  UIActions & 
  UserSlice & 
  UserActions & 
  ReviewSlice &
  GenreSlice;