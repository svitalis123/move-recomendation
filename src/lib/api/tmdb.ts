// src/lib/api/tmdb.ts
import { TMDBResponse, TMDBMovie, TMDBMovieDetail } from '@/types/api';

class TMDBClient {
  private apiKey: string;
  private baseUrl: string;
  private imageUrl: string;

  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || '';
    this.baseUrl = process.env.NEXT_PUBLIC_TMDB_API_URL || 'https://api.themoviedb.org/3';
    this.imageUrl = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p';
    
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('api_key', 'f0b95fd2de5092304fde6b428987cc18');
    

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error('TMDB API Error:', error);
      throw error;
    }
  }

  async getPopularMovies(page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetch(`/movie/popular?page=${page}&language=en-US`);
  }

  async getMovieDetails(id: string): Promise<TMDBMovieDetail> {
    return this.fetch(`/movie/${id}?append_to_response=credits,similar&language=en-US`);
  }

  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<TMDBMovie>> {
    return this.fetch(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  }

  getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) return '/placeholder-poster.jpg';
    return `${this.imageUrl}/${size}${path}`;
  }
}

const tmdbClient = new TMDBClient();
export { tmdbClient };