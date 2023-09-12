import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.getImageSrc(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />

      <div className="flex flex-col flex-1">
        <h3 className=" text-2xl font-medium  mb-3 ">{title}</h3>
        <div className=" flex item-center justify-between text-sm opacity-50 mb-10">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
      </div>
      <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
        Watch now
      </Button>
    </div>
  );
};

export default MovieCard;
