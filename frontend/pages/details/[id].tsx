import not_found_img from "../../public/notfound_placeholder.png";
import { BASE_SERVER_URL } from "../../constants/urls";
import CategoryCard from "../../components/categoryCard";
import { imdb } from "../../components/searchBar";
import RatingsForm from "../../components/form";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import PurchaseForm from "../../components/purchaseForm";
import NotFound from "../../components/404";
import { getValue, setValue } from "../../helpers/localStorageHandler";

export interface MovieDetails {
  _id: string;
  imdb: imdb;
  title: string;
  year: number;
  poster: string;
  plot: string;
  fullplot: string;
  cast: Array<string>;
  genres: Array<string>;
  runtime: number;
  price: number;
}

interface DetailsPageProps {
  data: MovieDetails;
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await fetch(`${BASE_SERVER_URL}/search/${id}`);
  const { data, success } = await res.json();

  return {
    props: { data: success ? data : { success: false } },
  };
}

const DetailsPage: NextPage<DetailsPageProps> = ({ data }) => {
  const { title, fullplot, imdb, genres, cast, year, poster } = data;

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ratingFormActive, setRatingFormActive] = useState<boolean>(false);
  const [purchaseFormActive, setPurchaseFormActive] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    checkPaymentSuccess();
    onMountLocalStorageCheck("ratedMovies", id, setIsRated);
    onMountLocalStorageCheck("liked_movies", id, setIsLiked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, ratingFormActive]);

  function onMountLocalStorageCheck(key: string, value: any, setter: any) {
    const arr = getValue(key);
    if (!arr) return;
    setter(arr.includes(value));
  }

  async function checkPaymentSuccess() {
    const res = await fetch(
      `${BASE_SERVER_URL}/checkPayment?mid=${id}&uid=${getValue("uid")}`
    );
    const { paymentSuccess } = await res.json();
    setPaymentSuccess(paymentSuccess);
  }

  function toggleLike(movieId: any) {
    let likesArray = getValue("liked_movies");
    if (likesArray) {
      if (likesArray.includes(movieId)) {
        const filtered = likesArray.filter((item: string) => item !== movieId);
        setValue("liked_movies", filtered);
        setIsLiked(false);
      } else {
        likesArray.push(movieId);
        setValue("liked_movies", likesArray);
        setIsLiked(true);
      }
    } else {
      setValue("liked_movies", [movieId]);
      setIsLiked(true);
    }
  }

  return (
    <>
      {data._id ? (
        <div className="flex justify-center align-middle">
          <Head>
            <title>{title}</title>
          </Head>
          <main className="flex flex-col md:flex-row">
            <div className="img md:w-2/6 pointer-events-none">
              <Image
                src={poster ? poster : not_found_img}
                alt="poster"
                className="-z-10"
                width={400}
                height={550}
              />
            </div>
            <div className="details flex flex-col md:w-4/6 ml-2 md:ml-10">
              <h1 className="text-base flex md:text-2xl font-bold">
                <span className="my-auto">
                  {title} ({year})
                </span>
                {isLiked ? (
                  <span
                    onClick={() => toggleLike(id)}
                    className="text-4xl my-auto cursor-pointer material-icons ml-auto text-red-500 hover:text-red-600 transition-all hover:scale-105"
                  >
                    favorite
                  </span>
                ) : (
                  <span
                    onClick={() => toggleLike(id)}
                    className="text-4xl my-auto cursor-pointer material-icons ml-auto text-gray-500 hover:text-red-400 transition-all hover:scale-105"
                  >
                    favorite
                  </span>
                )}
              </h1>
              <div className="genres flex my-3">
                {genres ? (
                  genres.map((item, idx) => {
                    return (
                      <CategoryCard
                        key={`${item}_${idx}_${Date.now()}`}
                        category={item}
                      />
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="cast flex my-2">
                <h3 className="font-bold text-xl mr-2">Cast - </h3>
                {cast ? (
                  cast.map((item, idx) => {
                    return (
                      <div
                        className="text-green-400 mr-3 underline font-bold hover:text-green-500"
                        key={`${item}_${idx}_${Date.now()}`}
                      >
                        <Link href={`https://www.google.com/search?q=${item}`}>
                          <a target="_blank">{item}</a>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <div className="rating text-xl my-4">
                <span className="font-bold">IMDB - </span>
                <span className="text-gray-600 italic">
                  ⭐ {imdb ? imdb.rating : 0}
                </span>
                <span className="font-bold mx-1"> | </span>
                <span className="font-bold"> Runtime - </span>
                <span className="text-gray-600 italic">
                  {data.runtime || 0} Min ⌚
                </span>
              </div>
              <div className="plot text-sm font-medium text-gray-700">
                {fullplot
                  ? fullplot.split(" ").slice(0, 140).join(" ")
                  : "No Description found for this movie!"}
              </div>
              <div className="btns mt-4 md:mt-auto mb-2 flex justify-between">
                {paymentSuccess ? (
                  <button className="mr-3 cursor-not-allowed flex align-middle justify-center bg-gray-500 text-white hover:bg-gray-600 p-2 w-full font-bold rounded-md">
                    <span className="material-icons mr-3">attach_money</span>{" "}
                    Already Purchased
                  </button>
                ) : (
                  <button
                    onClick={() => setPurchaseFormActive(!purchaseFormActive)}
                    className="mr-3 cursor-pointer flex align-middle justify-center bg-green-500 text-white hover:bg-green-600 p-2 w-full font-bold rounded-md"
                  >
                    <span className="material-icons mr-3">attach_money</span>{" "}
                    Buy this Movie
                  </button>
                )}
                {isRated ? (
                  <button className="mr-3 cursor-not-allowed flex align-middle justify-center bg-gray-500 text-white hover:bg-gray-600 p-2 w-full font-bold rounded-md">
                    <span className="material-icons mr-3">star_rate</span>{" "}
                    Already Rated
                  </button>
                ) : (
                  <button
                    onClick={() => setRatingFormActive(!ratingFormActive)}
                    className="mr-3 flex align-middle justify-center bg-blue-500 text-white hover:bg-blue-600 p-2 w-full font-bold rounded-md"
                  >
                    <span className="material-icons mr-3">star_rate</span> Rate
                    this Movie
                  </button>
                )}
              </div>
            </div>
          </main>
          <RatingsForm
            active={ratingFormActive}
            movieName={title}
            closeForm={() => setRatingFormActive(false)}
          />
          <PurchaseForm
            active={purchaseFormActive}
            closeForm={() => setPurchaseFormActive(false)}
            movieData={data}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default DetailsPage;
