import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";

import { fetcher } from "apiConfig/config";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=9e895c49952f072b62efa3ee129943a8`,
    fetcher
  );

  //   useEffect(() => {
  //     if (data && data.results) setMovie(data.results);
  //   }, [data]);

  const movie = data?.results || [];

  return (
    <section className="banner h-[400px]  page-container overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movie.length > 0 &&
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { title, backdrop_path, id } = item;

  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg bg-white relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg bg-opacity-10"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}
`}
        alt=""
        className="w-full h-full object-scale rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full">
        <h2 className=" text-white mb-5  font-bold text-3xl">{title}</h2>
        <div className="flex item-center gap-x-3 mb-8 text-white">
          <span className="px-4 py-2 rounded-md border border-white">
            Adventure
          </span>
          <span className="px-4 py-2 rounded-md border border-white">
            Fantasy
          </span>
          <span className="px-4 py-2 rounded-md border border-white">
            Fighting
          </span>
        </div>
        <Button bgColor="primary" onClick={() => navigate(`/movie/${id}`)}>
          Watch Now
        </Button>
      </div>
    </div>
  );
}

export default Banner;
