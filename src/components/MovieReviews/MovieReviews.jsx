/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../services/moviesApi";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <div>
      {reviews?.length === 0 && <p>We don't have any reviews for this movie</p>}
      {reviews?.length > 0 && (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default MovieReviews;
