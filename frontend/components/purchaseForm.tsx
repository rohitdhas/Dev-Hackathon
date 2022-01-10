import styles from "../styles/form.module.scss";
import not_found_img from "../public/notfound_placeholder.png";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "../constants/urls";
import { Movie } from "./searchBar";
import Image from "next/image";
import { getValue } from "../helpers/localStorageHandler";

interface Form {
  active: boolean;
  closeForm: Function;
  movieData: Movie;
}

const PurchaseForm: React.FC<Form> = ({ active, closeForm, movieData }) => {
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { title, year, poster, price } = movieData;

  function checkout() {
    setIsBtnClicked(true);

    fetch(`${BASE_SERVER_URL}/checkout`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieId: id,
        movieName: `${title} - (${year})`,
        price: price ? price : 499,
        uid: getValue("uid"),
      }),
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
      )
      .then(({ url }) => {
        window.location = url;
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div
        className={`${active ? styles.activeOverlay : styles.overlay}`}
        onClick={() => closeForm()}
      ></div>
      <div className={`${active ? styles.activeForm : styles.form} shadow-lg`}>
        <div className="heading border-b-2 border-b-gray-400">
          <h3 className="text-xl font-Poppins text-center text-gray-800 font-bold pb-2">
            Complete your Purchase ✅
          </h3>
        </div>
        <div className="text-center font-semibold my-2">
          <Image
            src={poster ? poster : not_found_img}
            alt="poster"
            height={150}
            width={100}
          />
          <p className="text-xl italic text-slate-800">
            {title} ({year})
          </p>
          <p className="text-sm my-2 font-bold text-gray-600">
            Price 💰 - {price || 499}/- INR
          </p>
        </div>
        {isBtnClicked ? (
          <button className="flex align-middle justify-center w-full bg-green-400 my-2 p-2 rounded-md text-white font-bold hover:bg-green-500">
            Almost there
            <span
              className={`${styles.loading_animation_btn} ml-2 my-auto`}
            ></span>
          </button>
        ) : (
          <button
            onClick={checkout}
            className="flex align-middle justify-center w-full bg-green-400 my-2 p-2 rounded-md text-white font-bold hover:bg-green-500"
          >
            Proceed to Checkout
            <span className="material-icons ml-2">account_balance_wallet</span>
          </button>
        )}
      </div>
    </>
  );
};

export default PurchaseForm;
