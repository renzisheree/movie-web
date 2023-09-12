import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebound";
// https://api.themoviedb.org/3/search/movie

const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState("1");
  const [filter, setFilter] = useState("");

  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=9e895c49952f072b62efa3ee129943a8&page=${nextPage}`
  );

  const filterDebound = useDebounce(filter, 700);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);

  const loading = !data & !error;

  useEffect(() => {
    if (filterDebound) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=9e895c49952f072b62efa3ee129943a8&query=${filterDebound}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=9e895c49952f072b62efa3ee129943a8&page=${nextPage}`
      );
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
      {/* <div className="flex items-center justify-center text-white mt-10 gap-x-5 hidden">
        <span
          className=" cursor-pointer"
          onClick={() => {
            nextPage === 1 ? setNextPage(nextPage) : setNextPage(nextPage - 1);
          }}
        >
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
              d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
            />
          </svg>
        </span>

        {new Array(PageCount).fill(1).map((item, index) => (
          <span
            onClick={() => {
              setNextPage(index + 1);
            }}
            className="cursor-pointer inline-block py-2 px-4 rounded-lg leading-none bg-white text-slate-900"
          >
            {index + 1}
          </span>
        ))}

        <span
          className=" cursor-pointer"
          onClick={() => {
            setNextPage(nextPage + 1);
          }}
        >
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
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div> */}
    </div>
  );
};

export default MoviePage;
