import { useEffect, useState } from "react";
import "./App.css";

import useMovies from "./hooks/useMovies";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (search === "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula solo con numeros");
      return;
    }

    if (search.length < 3) {
      setError("La pelicula debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, setSearch, error };
}

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
