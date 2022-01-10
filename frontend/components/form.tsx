import styles from "../styles/form.module.scss";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BASE_SERVER_URL } from "../constants/urls";

interface Form {
  active: boolean;
  closeForm: Function;
  movieName: String;
}

const RatingsForm: React.FC<Form> = ({ active, closeForm, movieName }) => {
  let ratingsNums: Array<number> = [];
  for (let x = 1; x < 11; x++) {
    ratingsNums.push(x);
  }
  const [ratings, setRatings] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Resetting Values
    setRatings(0);
    setEmail("");
  }, [id]);

  function submitRatings(event: any) {
    event.preventDefault();
    if (!ratings) return;
    setIsBtnClicked(true);

    fetch(`${BASE_SERVER_URL}/ratings`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: id, email, ratings, movieName }),
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (success) {
          setIsBtnClicked(false);
          saveInLocalStorage(id);
          closeForm();
        }
      })
      .catch((err) => console.log(err));
  }

  function saveInLocalStorage(id: any) {
    const idArray = localStorage.getItem("ratedMovies");
    if (idArray) {
      const ids = JSON.parse(idArray);
      ids.push(id);
      localStorage.setItem("ratedMovies", JSON.stringify(ids));
    } else {
      localStorage.setItem("ratedMovies", JSON.stringify([id]));
    }
  }

  return (
    <>
      <div
        className={`${active ? styles.activeOverlay : styles.overlay}`}
        onClick={() => closeForm()}
      ></div>
      <div className={`${active ? styles.activeForm : styles.form} shadow-lg`}>
        <div className="heading border-b-2 border-b-gray-400">
          <h3 className="text-xl text-gray-800 font-bold pb-2">
            How would you rate this movie?
          </h3>
        </div>
        <div className="stars my-4">
          <div className="flex justify-evenly">
            {ratingsNums.map((num) => {
              if (num <= ratings) {
                return (
                  <span
                    key={`${num}_form`}
                    onClick={() => setRatings(num)}
                    className="cursor-pointer hover:text-yellow-600 text-yellow-400 material-icons"
                  >
                    star
                  </span>
                );
              }
              return (
                <span
                  key={`${num}_form`}
                  onClick={() => setRatings(num)}
                  className="cursor-pointer hover:text-yellow-600 text-yellow-400 material-icons"
                >
                  star_outline
                </span>
              );
            })}
          </div>
          <div className="mt-1 text-center">
            {ratings ? (
              <p className="pt-2">
                <span className="font-bold text-xs text-gray-500">
                  You rated {ratings}/10
                </span>{" "}
                ⭐
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <form className="flex flex-col my-2" onSubmit={(e) => submitRatings(e)}>
          <input
            className="p-2 border-2 border-gray-400 focus:border-blue-500 outline-none rounded-md"
            type="email"
            placeholder="Your Email"
            value={email}
            required
            onChange={({ target }) => setEmail(target.value)}
          />
          <button
            type="submit"
            className={`flex align-middle justify-center bg-green-400 my-2 p-2 rounded-md text-white font-bold hover:bg-green-500`}
          >
            {isBtnClicked ? (
              <>
                Almost done
                <span
                  className={`${styles.loading_animation_btn} ml-2 my-auto`}
                ></span>
              </>
            ) : (
              <>
                Submit Ratings
                <span className="material-icons ml-2">check_circle</span>
              </>
            )}
          </button>
          <p className="text-center">
            <span className="text-xs font-bold text-gray-600">
              {"Don't worry, no spamming"}
            </span>
            🙂
          </p>
        </form>
      </div>
    </>
  );
};

export default RatingsForm;
