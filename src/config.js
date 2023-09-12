export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "9e895c49952f072b62efa3ee129943a8";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${apiKey}`,
};
