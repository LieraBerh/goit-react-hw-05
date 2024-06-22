/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`
                  : "https://via.placeholder.com/200x300?text=Image+Not+Available"
              }
              alt={movie.title}
            />
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
