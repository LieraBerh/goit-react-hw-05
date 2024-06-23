import toast, { Toaster } from "react-hot-toast";
import { searchMovie } from "../../services/moviesApi";
import { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchData = async () => {
      if (query) {
        try {
          const data = await searchMovie(query);
          setFilteredMovies(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [query]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (searchTerm.trim() === "") {
      toast("Please enter search term", {
        style: {
          background: "pink",
        },
      });
      return;
    }
    try {
      const data = await searchMovie(searchTerm);
      setFilteredMovies(data);
      setSearchParams({ query: searchTerm });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
          value={searchTerm}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={filteredMovies} />
      {error && <p>{error}</p>}
    </>
  );
};

export default MoviesPage;
