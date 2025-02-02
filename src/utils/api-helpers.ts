import { TMDBMovie } from '@/types/api';

export function formatTMDBMovie(movie: TMDBMovie) {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterUrl: movie.poster_path 
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/w500${movie.poster_path}`
      : null,
    backdropUrl: movie.backdrop_path
      ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL}/original${movie.backdrop_path}`
      : null,
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
  };
}


export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}