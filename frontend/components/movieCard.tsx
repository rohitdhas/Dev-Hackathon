import not_found_img from "../public/notfound_placeholder.png";
import { useRouter } from "next/router";
import { Movie } from "./searchBar";
import Image from "next/image";
import React from "react";

interface CardProps {
  data: Movie;
}

const MovieCard: React.FC<CardProps> = ({ data }) => {
  const router = useRouter();

  function openDetailsPage(movieId: string) {
    router.push({ pathname: `/details/${movieId}` });
  }

  return (
    <div className="card flex align-middle bg-blue-200 p-2 rounded-md my-3">
      <div className="img">
        <Image
          src={data.poster ? data.poster : not_found_img}
          layout="fixed"
          width={160}
          height={220}
          alt="movie poster"
        />
      </div>
      <div className="details ml-10">
        <h3 className="text-2xl my-3 font-extrabold">
          {data.title} ({data.year})
        </h3>
        <div className="ratings text-xl my-3">
          <span>⭐</span>
          <span className="font-bold">{data.imdb.rating}</span>
        </div>
        <p className="my-3 text-slate-700">
          {data.plot || "No Description found for this movie!"}
        </p>
        <button
          onClick={() => openDetailsPage(data._id)}
          className="flex align-middle justify-center my-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 p-3"
        >
          View More
          <span className="material-icons ml-2">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
