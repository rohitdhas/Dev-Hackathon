import React, { useState } from "react";
import styles from "../styles/searchbar.module.scss";
import { useAutocomplete } from "../helpers/hooks";
import { useRouter } from "next/router";

export interface imdb {
  rating: number;
  votes: number;
  id: string;
}

export interface Movie {
  _id: string;
  title: string;
  year: number;
  poster: string;
  plot: string;
  imdb: imdb;
}

export default function Searchbar() {
  const [input, setInput] = useState("");
  const { data, isLoading } = useAutocomplete(input);
  const router = useRouter();

  function search(e: any) {
    e.preventDefault();
    if (!input) return;
    router.push({ pathname: `/search/${input}` });
    setInput("");
  }

  function openDetailsPage(movieId: string) {
    router.push({ pathname: `/details/${movieId}` });
    setInput("");
  }

  return (
    <div className="mx-auto relative">
      <div className="relative p-0 m-0">
        <form onSubmit={(e) => search(e)} className="bg-white rounded-md">
          <input
            className={`${styles.searchbar} border-gray-400 md:py-3 md:w-500 md:plpr-10per w-auto border-2 p-2 rounded-md focus:border-green-800 outline-none`}
            type="text"
            placeholder="Type Something!"
            value={input}
            onChange={({ target }) => setInput(target.value)}
          />
        </form>
        {input && !isLoading ? (
          <span
            onClick={() => setInput("")}
            className="material-icons cursor-pointer text-gray-500 absolute right-0 top-3.5 mr-3 top-25 hover:text-gray-600"
          >
            cancel
          </span>
        ) : input && isLoading ? (
          <span
            onClick={() => setInput("")}
            className={`${styles.searching_animation} text-blue-600 absolute right-0 top-3.5 mr-3 top-25`}
          ></span>
        ) : null}
      </div>
      {input ? (
        <ul
          className={`${styles.autocomplete_item_list} max-h-52 overflow-auto md:overflow-hidden md:max-h-500 shadow-md md:w-500 w-auto bg-white absolute`}
        >
          {data.length > 0 ? (
            data.map((doc: Movie) => {
              return (
                <li
                  onClick={() => openDetailsPage(doc._id)}
                  className="flex justify-start align-middle"
                  key={doc._id}
                >
                  <span className="material-icons text-slate-300 mx-2">
                    movie
                  </span>
                  <p>{doc.title}</p>
                </li>
              );
            })
          ) : (
            <li className="text-center">No results found!</li>
          )}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
