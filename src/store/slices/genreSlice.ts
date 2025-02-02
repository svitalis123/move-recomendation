// src/store/slices/genreSlice.ts
import { StateCreator } from 'zustand';
import { TMDBGenre } from '@/types/api';
import { tmdbClient } from '@/lib/api/tmdb';

export interface GenreState {
  genres: TMDBGenre[];
  loading: boolean;
  error: string | null;
}

export interface GenreActions {
  fetchGenres: () => Promise<void>;
}

export type GenreSlice = GenreState & GenreActions;

export const createGenreSlice: StateCreator<GenreSlice> = (set) => ({
  genres: [],
  loading: false,
  error: null,

  fetchGenres: async () => {
    try {
      set({ loading: true, error: null });
      const { genres } = await tmdbClient.getGenres();
      set({ genres, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch genres',
        loading: false 
      });
    }
  },
});