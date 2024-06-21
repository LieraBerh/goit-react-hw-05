import axios from "axios";

const API_KEY = "cd9bf84eeba53cc0db67aa62b428c39a";

export const fetchTrendingMovies = async () => {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data.results;
};

export const fetchMovie = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchActors = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data.cast;
};

export const fetchReviews = async (movieId) => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`;
  const response = await axios.get(url);
  return response.data.results;
};
