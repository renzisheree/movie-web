import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const { data } = useSWR(tmdbAPI.getyMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.getImageSrc(backdrop_path)}
        )`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.getImageSrc(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <h1 className="text-white text-center text-2xl font-bold mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className=" flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border rounded"
              key={item.id}
            >
              {" "}
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-white leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideoTrailer></MovieVideoTrailer>
      <SimilarMovie></SimilarMovie>
    </div>
  );
};
function MovieCredit() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieCredit(movieId), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length === 0) return null;
  return (
    <>
      <h2 className="text-white font-bold text-center text-3xl mb-10">Casts</h2>

      <div className="grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast_item">
            <img
              className="w-full h-[350px] object-cover rounded-lg"
              src={tmdbAPI.getImageSrc(item.profile_path)}
              alt=""
            />
            <h3 className="text-white text-xl text-center mt-3">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

function MovieVideoTrailer() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieVideo(movieId), fetcher);
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;

  return (
    <div className="py-10">
      <div className="flex flex-col gap-10"></div>
      {results.slice(0, 3).map((item) => (
        <div className="" key={item.id}>
          <h3 className="p-3 text-center  mb-5 text-xl font-medium text-white bg-secondary inline-block ">
            {item.name}
          </h3>
          <div key={item.id} className="w-full aspect-video">
            <iframe
              width="1257"
              height="707"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="Elemental | We Love You Lutz"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
            ;
          </div>
        </div>
      ))}
    </div>
  );
}

function SimilarMovie() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getSimilarMovie(movieId), fetcher);
  if (!data) return null;
  const { results } = data;

  if (!results || results.length <= 0) return null;
  console.log({ results });
  return (
    <div className="py-10">
      <h2 className=" text-center text-3xl font-medium mb-10 text-secondary">
        {" "}
        Similar Movies
      </h2>{" "}
      <div className="swiper-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((movieItem) => (
              <SwiperSlide key={movieItem.id}>
                <MovieCard item={movieItem} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailPage;
