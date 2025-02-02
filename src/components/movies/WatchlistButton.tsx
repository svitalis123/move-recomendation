'use client';

import { useStore } from '@/store';
import { TMDBMovie } from '@/types/movie.types';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';

interface WatchlistButtonProps {
  movie: TMDBMovie;
}

export function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useStore();
  const inWatchlist = isInWatchlist(movie.id);

  const handleClick = () => {
    if (inWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full transition-colors ${
        inWatchlist 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      {inWatchlist ? (
        <BookmarkCheck className="w-5 h-5" />
      ) : (
        <BookmarkPlus className="w-5 h-5" />
      )}
    </button>
  );
}