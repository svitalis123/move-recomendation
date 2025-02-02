  import Image from 'next/image';
  import Link from 'next/link';
  import { Star } from 'lucide-react';
  import { TMDBMovie } from '@/types/api';
  import { formatDate } from '@/lib/utils/formatters';

  interface MovieCardProps {
    movie: TMDBMovie;
  }

  export function MovieCard({ movie }: MovieCardProps) {
    // Default image if no poster is available
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/placeholder-movie.jpg'; // Make sure to add this image to your public folder

    return (
      <Link 
        href={`/movies/${movie.id}`}
        className="group rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[2/3] bg-gray-200">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = '/placeholder.webp';
            }}
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="p-4 text-white h-full flex flex-col justify-end">
              <div className="flex items-center space-x-1 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(movie.release_date)}
          </p>
        </div>
      </Link>
    );
  }