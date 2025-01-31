'use client'
import Image from 'next/image';
import { Star, Clock, Calendar } from 'lucide-react';
import { TMDBMovieDetail } from '@/types/api';
import { formatDate, formatRuntime } from '@/lib/utils/formatters'; 

interface MovieDetailsProps {
  movie: TMDBMovieDetail;
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.webp';

  return (
    <div>
      {backdropUrl && (
        <div className="relative h-[400px] -mx-4 mb-8">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/placeholder.webp';
              }}
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-xl text-gray-500 italic mb-4">{movie.tagline}</p>
          )}

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-lg mb-8">{movie.overview}</p>

          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movie.credits.cast.slice(0, 4).map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="relative aspect-square rounded-full overflow-hidden mb-2">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : '/placeholder.webp'
                      }
                      alt={actor.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = '/placeholder-avatar.jpg';
                      }}
                    />
                  </div>
                  <p className="font-medium">{actor.name}</p>
                  <p className="text-sm text-gray-500">{actor.character}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {movie.similar?.results && movie.similar.results.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movie.similar.results.slice(0, 4).map((similarMovie) => (
              <div key={similarMovie.id} className="relative aspect-[2/3] rounded-lg overflow-hidden">
                <Image
                  src={
                    similarMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`
                      : '/placeholder.webp'
                  }
                  alt={similarMovie.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.webp';
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="p-4 text-white h-full flex flex-col justify-end">
                    <h3 className="font-medium text-lg">{similarMovie.title}</h3>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{similarMovie.vote_average.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}