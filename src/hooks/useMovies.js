import movieResponse from "../mocks/mock-results.json";
import noResults from "../mocks/no-results.json";

export default function useMovies() {
  const movies = movieResponse.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));
  return { movies: mappedMovies };
}
