import { useRef } from "react";
import "./App.css";

import useMovies from "./hooks/useMovies";

export default function App() {
  const { movies } = useMovies();

  const hasMovies = movies?.length > 0;

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // UNCONTROLLED INPUT
    // const fields = Object.fromEntries(new window.FormData(e.target));
    // //    // const searchBar = fields.get("searchBar");
    // console.log(fields);

    // useRef INPUT management
    // const value = inputRef.current.value;
    // alert(value);
    // inputRef.current.value = "";
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
            ref={inputRef}
          />
          <button type="submit">Search</button>
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
          <li key={movie.id}>
            {movie.title} ({movie.year})
            <img src={movie.poster} alt={`${movie.title} poster image`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function RenderNoResults() {
  return <p>No Results Found</p>;
}
