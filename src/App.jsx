import "./App.css";
import movieResponse from "./mocks/mock-results.json";
import noResults from "./mocks/no-results.json";

export function useMovies() {}

export default function App() {
  const movies = movieResponse.Search;
  const hasMovies = movies?.length > 0;

  return (
    <div className="page">
      <h1>Prueba Tecnica</h1>
      <header>
        <label htmlFor="searchBar">Search Movie Here...</label>
        <form>
          <input
            type="text"
            placeholder="Avengers, Matrix, LOTR..."
            name="searchBar"
            id="searchBar"
          />
          <button type="submit"> Search </button>
        </form>
      </header>

      <main>
        {/* Movies Will Go Here */}
        {hasMovies ? <RenderMovies movies={movies} /> : <RenderNoResults />}
      </main>
    </div>
  );
}

function RenderMovies({ movies }) {
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            {movie.Title} ({movie.Year})
            <img src={movie.Poster} alt={`${movie.Title} poster image`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RenderNoResults() {
  return <p>No Results Found</p>;
}
