export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "9e895c49952f072b62efa3ee129943a8";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const imgSrcEndpoint = "https://image.tmdb.org/t/p/original/";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,

  getyMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieCredit: (movieId) =>
    `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
  getMovieVideo: (movieId) =>
    `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,

  getSimilarMovie: (movieId) =>
    `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
  getImageSrc: (url) => `${imgSrcEndpoint}/${url}`,
};
