import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../apiConfig/config";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  console.log(data);

  const movie = data?.results || [];

  return (
    <div className="swiper-list">
      <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((movieItem) => (
            <SwiperSlide key={movieItem.id}>
              <MovieCard item={movieItem} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
