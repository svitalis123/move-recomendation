'use client';

import { useStore } from '@/store';
import { MovieCard } from '@/components/movies/MovieCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export function SearchResults() {
  const { searchResults, searchLoading, searchError } = useStore();

  if (searchError) {
    return (
      <div className="text-center py-8 text-red-500">
        {searchError}
      </div>
    );
  }

  if (searchLoading) {
    return <LoadingSpinner />;
  }

  if (!searchResults?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found. Try searching for something else.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchResults.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}