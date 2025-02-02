// src/components/movies/MovieGrid.tsx
'use client';

import { useEffect, useCallback, useMemo } from 'react';
import { useStore } from '@/store';
import { MovieCard } from './MovieCard';
import { Pagination } from '../common/Pagination';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { TMDBMovie } from '@/types/api';

export function MovieGrid() {
  const movies = useStore(state => state.movies as TMDBMovie[]);
  const loading = useStore(state => state.loading);
  const error = useStore(state => state.error);
  const fetchMovies = useStore(state => state.fetchMovies);
  const pagination = useStore(state => state.pagination);
  const setPagination = useStore(state => state.setPagination);
  const preferences = useStore(state => state.preferences);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]); 

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(newPage, pagination.totalPages);
    fetchMovies(newPage);
  }, [fetchMovies, pagination.totalPages, setPagination]);

  const filteredMovies = useMemo(() => {
    if (!preferences.genres.length) {
      return movies;
    }
    return movies.filter(movie => 
      movie.genre_ids.some(genreId => 
        preferences.genres.includes(genreId)
      )
    );
  }, [movies, preferences.genres]);

  if (loading && !movies.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => fetchMovies(pagination.page)}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!filteredMovies.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          {movies.length ? 'No movies match the selected filters.' : 'No movies found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-4">
          <LoadingSpinner />
        </div>
      )}
      
      {pagination.totalPages > 1 && (
        <Pagination 
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}