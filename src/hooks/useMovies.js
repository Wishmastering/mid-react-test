// import withResults from "../mocks/mock-results.json";
// import noResults from "../mocks/no-results.json";
import { useRef, useState, useMemo, useEffect } from "react";
import { searchMovies } from "../services/movies.js";

export default function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = async () => {
    console.log("hello");
    if (search === previousSearch.current) return;
    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Get Movies Function Ran");
  }, [getMovies]);

  const sortedMovies = useMemo(() => {
    console.log("Memo Sorted Movies");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [movies, sort]);

  return { movies: sortedMovies, getMovies, loading };
}
