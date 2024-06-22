import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchActors } from "../../services/moviesApi";

const MovieCast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchActors(movieId);
        setActors(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      {actors?.length === 0 && <p>No info</p>}
      <ul>
        {actors?.map((actor) => (
          <li key={actor?.id}>
            <img
              src={
                actor?.profile_path
                  ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                  : "https://via.placeholder.com/200x300"
              }
              alt={actor?.name}
            />
            <h3>{actor?.name}</h3>
            <p>{actor?.character}</p>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </>
  );
};
export default MovieCast;
