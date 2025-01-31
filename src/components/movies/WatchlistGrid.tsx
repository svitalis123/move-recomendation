'use client';

import { useStore } from '@/store';
import { MovieCard } from './MovieCard';

export function WatchlistGrid() {
  const { watchlist } = useStore();

  if (!watchlist.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          Your watchlist is empty. Start adding movies you want to watch later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {watchlist.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}