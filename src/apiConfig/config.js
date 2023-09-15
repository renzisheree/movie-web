export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "9e895c49952f072b62efa3ee129943a8";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const imgSrcEndpoint = "https://image.tmdb.org/t/p/original/";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,

  getyMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieCredit: (movieId) =>
    `${tmdbEndpoint}/${movieId}/credits?api_key=${apiKey}`,
  getMovieVideo: (movieId) =>
    `${tmdbEndpoint}/${movieId}/videos?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,

  getSimilarMovie: (movieId) =>
    `${tmdbEndpoint}/${movieId}/similar?api_key=${apiKey}`,
  getImageSrc: (url) => `${imgSrcEndpoint}/${url}`,

  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
};
