
export interface TMDBMovie {

  id: number;

  title: string;

  overview: string;

  release_date: string;

  poster_path: string | null; 

  backdrop_path: string | null;

  vote_average: number;

  vote_count: number;

  adult: boolean;

  original_language: string;

  popularity: number;

  genre_ids: number[];

}

export interface TMDBGenre {
  id: number;
  name: string;
}



export interface TMDBMovieDetail extends Omit<TMDBMovie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string | null; 
  reviews?: Review[];
  averageRating?: number;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  similar: {
    results: TMDBMovie[];
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  movieId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}