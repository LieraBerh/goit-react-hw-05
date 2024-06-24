import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/moviesApi";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {trendingMovies.length > 0 && (
        <MovieList movies={trendingMovies} location={location} />
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
export default HomePage;
