import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import s from "./MovieDetailsPage.module.css";
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

  const goBack = useRef(location.state || "/movies");

  return (
    <>
      <div>
        <Link to={goBack.current} className={s.go_back_btn}>
          Go back
        </Link>
        <div className={s.poster_wrapper}>
          <img
            src={
              movie && movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                : "https://via.placeholder.com/500x281"
            }
            alt={movie?.title}
            className={s.movie_poster}
          />
        </div>
        <div className={s.text_wrapper}>
          <h1 className={s.movie_title}>{movie?.title}</h1>
          <p className={s.movie_score}>
            User Score: {((movie?.vote_average / 10) * 100).toFixed()}%{" "}
          </p>
          <h3>Overview</h3>
          <p>{movie?.overview}</p>
          <h3>Genres</h3>
          <ul className={s.genres_list}>
            {movie?.genres.map((genre) => (
              <li key={genre.id} className={s.genres_item}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className={s.links}>
        <li>
          <Link to="cast" className={s.link}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" className={s.link}>
            Reviews
          </Link>
        </li>
      </ul>
      <Suspense>
        <Outlet />
      </Suspense>
      {error && <p>{error}</p>}
    </>
  );
};
export default MovieDetailsPage;
