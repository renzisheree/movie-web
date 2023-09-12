import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { fetcher, tmdbAPI } from "apiConfig/config";
import MovieCard from "components/movie/MovieCard";
import useDebounce from "hooks/useDebound";
// https://api.themoviedb.org/3/search/movie

const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState("1");
  const [filter, setFilter] = useState("");

  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));

  const filterDebound = useDebounce(filter, 700);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);

  const loading = !data & !error;

  useEffect(() => {
    if (filterDebound) {
      setUrl(tmdbAPI.getMovieSearch(filterDebound, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebound, nextPage]);

  const movie = data?.results || [];
  console.log(movie);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10 page-container ">
      <div className="flex mb-10 bg-gray-800">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-transparent outline-none bg-slate-600 text-white"
            placeholder="Type here to search.."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin mb-10 mt-20"></div>
      )}

      {!loading && (
        <div className="grid grid-cols-4 gap-10 items-center ">
          {movie.length > 0 &&
            movie.map((item) => (
              <MovieCard key={item.id} item={item}></MovieCard>
            ))}
        </div>
      )}

      <ReactPaginate
        className=" pagination text-white mt-8"
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default MoviePage;
