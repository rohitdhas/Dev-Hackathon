import React, { useState } from "react";
import { MovieDetails } from "../pages/details/[id]";
import Link from "next/link";
import styles from "../styles/form.module.scss";

interface ComponentProps {
  data: MovieDetails;
}

const PurchaseCard: React.FC<ComponentProps> = ({ data }) => {
  const { title, runtime, price, year, _id } = data;
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  return (
    <div className="flex justify-evenly my-4 mx-4 bg-blue-200 p-6 rounded-sm text-center">
      <span className="material-icons text-9xl bg-blue-500 text-white rounded-md mr-5">
        theaters
      </span>
      <div className="info flex flex-col">
        <h4 className="text-xl font-bold text-slate-700">
          {title} ({year})
        </h4>
        <div className="runtime font-semibold my-1 text-slate-600">
          {runtime} Min runtime ⌚
        </div>
        <div className="price mb-2 underline text-green-600 font-semibold text-sm">
          Purchased for {price}/- INR
        </div>
        <div className="mt-auto">
          <Link href={`/details/${_id}`}>
            <a>
              <button
                onClick={() => setIsBtnClicked(true)}
                className="flex justify-center w-full rounded-sm p-2 bg-blue-500 hover:bg-blue-600 font-semibold text-white"
              >
                {isBtnClicked ? (
                  <>
                    Loading...
                    <span
                      className={`${styles.loading_animation_btn} ml-2 my-auto`}
                    ></span>
                  </>
                ) : (
                  <>View More</>
                )}
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCard;
