// src/types/tmdb.ts

export type TMDBItem = {
  id: number ;
  title?: string;            // movies
  name?: string;             // tv
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;     // movies
  first_air_date?: string;   // tv
  overview: string;
};
