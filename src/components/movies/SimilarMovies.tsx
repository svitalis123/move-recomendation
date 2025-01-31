'use client';

import { useStore } from '@/store';
import { MovieCard } from './MovieCard';

interface SimilarMoviesProps {
  movieId: string;
}

export function SimilarMovies({ movieId }: SimilarMoviesProps) {
  const { currentMovie } = useStore();

  if (!currentMovie?.similar?.results.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentMovie.similar.results.slice(0, 4).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}