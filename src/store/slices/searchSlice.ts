import { StateCreator } from 'zustand';
import { TMDBMovie } from '@/types/api';
import { tmdbClient } from '@/lib/api/tmdb';

interface SearchState {
  searchResults: TMDBMovie[];
  searchLoading: boolean;
  searchError: string | null;
}

interface SearchActions {
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export type SearchSlice = SearchState & SearchActions;

export const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  searchResults: [],
  searchLoading: false,
  searchError: null,

  performSearch: async (query) => {
    if (!query.trim()) {
      set({ searchResults: [], searchLoading: false, searchError: null });
      return;
    }

    try {
      set({ searchLoading: true, searchError: null });
      const response = await tmdbClient.searchMovies(query);
      set({ searchResults: response.results });
    } catch (error) {
      console.error('Search error:', error);
      set({ searchError: 'Failed to perform search' });
    } finally {
      set({ searchLoading: false });
    }
  },

  clearSearch: () => {
    set({ searchResults: [], searchError: null });
  },
});