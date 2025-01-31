// src/store/slices/movieSlice.ts
import { StateCreator } from 'zustand';
import { Movie, MovieDetail } from '@/types/movie.types';
import { tmdbClient } from '@/lib/api/tmdb';

export interface MovieSlice {
  movies: Movie[];
  currentMovie: MovieDetail | null;
  pagination: {
    page: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

export interface MovieActions {
  setMovies: (movies: Movie[]) => void;
  setCurrentMovie: (movie: MovieDetail | null) => void;
  setPagination: (page: number, totalPages: number) => void;
  fetchMovies: (page: number) => Promise<void>;
  fetchMovieById: (id: string) => Promise<void>;
}

export const createMovieSlice: StateCreator<
  MovieSlice & MovieActions,
  [],
  [],
  MovieSlice & MovieActions
> = (set, get) => ({
  movies: [],
  currentMovie: null,
  pagination: {
    page: 1,
    totalPages: 1,
  },
  loading: false,
  error: null,

  setMovies: (movies) => set({ movies }),
  setCurrentMovie: (movie) => set({ currentMovie: movie }),
  setPagination: (page, totalPages) => 
    set({ pagination: { page, totalPages } }),
  
  fetchMovies: async (page) => {
    set({ loading: true, error: null });
    
    try {
      const data = await tmdbClient.getPopularMovies(page);
      
      if (!data || !data.results) {
        throw new Error('Invalid response from TMDB API');
      }
      
      set({ 
        movies: data.results,
        pagination: {
          page: data.page,
          totalPages: data.total_pages
        },
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch movies',
        loading: false
      });
    }
  },
  
  fetchMovieById: async (id) => {
    set({ loading: true, error: null });
    
    try {
      const movie = await tmdbClient.getMovieDetails(id);
      set({ 
        currentMovie: movie,
        loading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch movie details',
        loading: false
      });
    }
  },
});