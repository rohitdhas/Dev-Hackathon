import type { NextPage } from "next";
import { BASE_SERVER_URL } from "../constants/urls";
import { useEffect, useState } from "react";
import { getValue } from "../helpers/localStorageHandler";
import Head from "next/head";
import MovieCard from "../components/movieCard";
import { Movie } from "../components/searchBar";

const Favorites: NextPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const likesArr = getValue("liked_movies");
    if (!likesArr || !likesArr.length) return;

    const res = await fetch(`${BASE_SERVER_URL}/favorites`, {
      method: "post",
      body: JSON.stringify({ arr: likesArr }),
      headers: { "Content-Type": "application/json" },
    });
    const { data } = await res.json();
    if (data) setData(data);
  }

  return (
    <div>
      <Head>
        <title>Favorites 🧡</title>
      </Head>
      <main>
        <h2 className="text-2xl font-bold text-center">
          Your Favorite Movies 🧡
        </h2>
        {data.length > 0 ? (
          data.map((item: Movie) => <MovieCard key={item._id} data={item} />)
        ) : (
          <div className="border-t-2 border-t-gray-400 pt-2 my-2">
            <h1 className="text-slate-600 text-xl text-center mx-auto font-bold">
              {"You don't have any liked movies!"}
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
