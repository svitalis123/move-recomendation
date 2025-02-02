import { Suspense } from 'react';
import { MovieDetails } from '@/components/movies/MovieDetails';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { tmdbClient } from '@/lib/api/tmdb';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export default async function MoviePage({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}) {
  try {
    const movie = await tmdbClient.getMovieDetails(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <MovieDetails movie={movie} />
        </Suspense>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any;
}): Promise<Metadata> {
  try {
    const movie = await tmdbClient.getMovieDetails(params.id);
    return {
      title: `${movie.title} - MovieRec`,
      description: movie.overview,
    };
  } catch {
    return {
      title: 'Movie - MovieRec',
      description: 'Movie details',
    };
  }
}