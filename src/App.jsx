import { useEffect, useState, useRef } from "react";
import "./App.css";

import useMovies from "./hooks/useMovies";
import useSearch from "./hooks/useSearch";

export default function App() {
  const { movies } = useMovies();
  const { search, setSearch, error } = useSearch();

  const hasMovies = movies?.length > 0;

  // const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ search });
    alert(`Click ${search}`);

    // UNCONTROLLED INPUT
    // const fields = Object.fromEntries(new window.FormData(e.target));
    // //    // const searchBar = fields.get("searchBar");
    // console.log(fields);

    // useRef INPUT management
    // const value = inputRef.current.value;
    // alert(value);
    // inputRef.current.value = "";
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
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
            // ref={inputRef}
            value={search}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
    <ul className="movies">
      {movies.map((movie) => (
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
