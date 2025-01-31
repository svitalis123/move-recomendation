import { StateCreator } from 'zustand';
import { Movie } from '@/types/movie.types';

export interface UserPreferences {
  genres: number[];
  adultContent: boolean;
  language: string;
}

export interface UserSlice {
  preferences: UserPreferences;
  watchlist: Movie[];
  loading: boolean;
}

export interface UserActions {
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const createUserSlice: StateCreator<
  UserSlice & UserActions,
  [],
  [],
  UserSlice & UserActions
> = (set, get) => ({
  preferences: {
    genres: [],
    adultContent: false,
    language: 'en',
  },
  watchlist: [],
  loading: false,

  setPreferences: (newPreferences) => {
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    }));
  },

  addToWatchlist: (movie) => {
    set((state) => ({
      watchlist: [...state.watchlist, movie],
    }));
  },

  removeFromWatchlist: (movieId) => {
    set((state) => ({
      watchlist: state.watchlist.filter((movie) => movie.id !== movieId),
    }));
  },

  isInWatchlist: (movieId) => {
    return get().watchlist.some((movie) => movie.id === movieId);
  },
});