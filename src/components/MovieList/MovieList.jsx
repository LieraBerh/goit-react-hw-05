/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`}
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
