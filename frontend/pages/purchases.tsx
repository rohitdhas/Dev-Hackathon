import type { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../constants/urls";
import { getValue } from "../helpers/localStorageHandler";
import PurchaseCard from "../components/purchaseCard";
import { MovieDetails } from "./details/[id]";

const Purchases: NextPage = () => {
  const [infoCardVisable, setInfoCardVisable] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getPurchases();
  }, []);

  async function getPurchases() {
    const res = await fetch(
      `${BASE_SERVER_URL}/getPaidMovies?uid=${getValue("uid")}`
    );
    const { data } = await res.json();
    console.log(data);
    if (data) setData(data);
  }

  return (
    <div>
      <Head>
        <title>Your Purchases</title>
      </Head>
      <main>
        <h2 className="text-2xl font-bold text-center">Your Purchases 🎈</h2>
        {infoCardVisable ? (
          <div className="flex justify-center font-semibold text-sm text-center p-3 my-4 mb-5 bg-green-200 text-slate-700 border-2 border-green-500 rounded-sm">
            <span className="flex-1">
              All of your Successful Purchases will appear here ✅
            </span>
            <span
              onClick={() => setInfoCardVisable(false)}
              className="material-icons my-auto cursor-pointer hover:text-slate-400 font-bold"
            >
              close
            </span>
          </div>
        ) : (
          <></>
        )}
        {data.length > 0 ? (
          <div className="cards my-6 grid grid-cols-1 md:grid-cols-2">
            {data.map((doc: MovieDetails) => (
              <PurchaseCard key={doc._id} data={doc} />
            ))}
          </div>
        ) : (
          <div className="border-t-2 border-t-gray-400 pt-2 my-2">
            <h1 className="text-slate-600 text-2xl text-center mx-auto font-bold">
              {`You don't have any Purchases`}😐
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Purchases;
