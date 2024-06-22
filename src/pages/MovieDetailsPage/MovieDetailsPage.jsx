import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovie } from "../../services/moviesApi";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovie(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [movieId]);

  const goBack = location.state ?? "/movies";

  return (
    <>
      <div>
        <Link to={goBack}>Go back</Link>
        <div>
          <img
            src={
              movie && movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                : "https://via.placeholder.com/500x281"
            }
            alt={movie?.title}
          />
        </div>
        <div>
          <h1>{movie?.title}</h1>
          <p>User Score: {((movie?.vote_average / 10) * 100).toFixed()}% </p>
          <h3>Overview</h3>
          <p>{movie?.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie?.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet />
      {error && <p>{error}</p>}
    </>
  );
};
export default MovieDetailsPage;
