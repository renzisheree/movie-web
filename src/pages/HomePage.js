import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movie-layout page-container mb-20 mt-20">
        <h2 className=" mb-10 capitalize text-3xl font-bold text-white pb-5">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="movie-layout page-container mb-20 mt-20">
        <h2 className=" mb-10 capitalize text-3xl font-bold text-white pb-5">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movie-layout page-container mb-20 mt-20">
        <h2 className=" mb-10 capitalize text-3xl font-bold text-white pb-5">
          Trending{" "}
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
