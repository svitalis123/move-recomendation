// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Suspense } from 'react';
import { MovieDetails } from '@/components/movies/MovieDetails';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { tmdbClient } from '@/lib/api/tmdb';
import { notFound } from 'next/navigation';

interface MoviePageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function MoviePage({ params }: MoviePageProps) {
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

export async function generateMetadata({ params }: MoviePageProps) {
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