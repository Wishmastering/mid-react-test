import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";

import useMovies from "./hooks/useMovies";
import useSearch from "./hooks/useSearch";
import debounce from "just-debounce-it";

export default function App() {
  const [sort, setSort] = useState(false);

  const { search, setSearch, error } = useSearch();

  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 500),
    []
  );

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChange = (e) => {
    let newSearch = e.target.value;
    setSearch(newSearch);
    debouncedGetMovies(search);
  };

  return (
    <div className="page">
      <h1>Prueba Tecnica</h1>
      <header>
        <label htmlFor="searchBar">Search Movie Here...</label>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Avengers, Matrix, LOTR..."
            name="searchBar"
            id="searchBar"
            value={search}
            onChange={handleChange}
          />
          <input type="checkbox" onClick={handleSort} />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        {loading ? <p>Cargando ... </p> : <RenderMovies movies={movies} />}
      </main>
    </div>
  );
}

function RenderMovies({ movies }) {
  return (
    <ul className="movies">
      {movies?.map((movie) => (
        <li className="movie" key={movie.id}>
          {movie.title} ({movie.year})
          <img src={movie.poster} alt={`${movie.title} poster image`} />
        </li>
      ))}
    </ul>
  );
}

function RenderNoResults() {
  return <p>No Results Found</p>;
}
