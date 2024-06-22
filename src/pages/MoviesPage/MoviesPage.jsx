import toast, { Toaster } from "react-hot-toast";
import { searchMovie } from "../../services/moviesApi";
import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

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
    } catch (error) {
      setError(error.message);
    } finally {
      evt.target.reset();
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
          name="movie"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={filteredMovies} />
      {error && <p>{error}</p>}
    </>
  );
};
export default MoviesPage;
