'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';
import { MovieCard } from './MovieCard';
import { Pagination } from '../common/Pagination';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function MovieGrid() {
  const { 
    movies, 
    loading, 
    error, 
    fetchMovies, 
    pagination,
    setPagination 
  } = useStore();

  useEffect(() => {
    console.log('MovieGrid mounted');
    fetchMovies(1);
  }, []); // Only fetch on mount

  const handlePageChange = (newPage: number) => {
    setPagination(newPage, pagination.totalPages);
    fetchMovies(newPage);
  };

  console.log('Current state:', { loading, error, movieCount: movies?.length });

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

  if (!movies?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
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