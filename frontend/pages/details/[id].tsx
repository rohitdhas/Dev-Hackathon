import not_found_img from "../../public/notfound_placeholder.png";
import CategoryCard from "../../components/categoryCard";
import { imdb } from "../../components/searchBar";
import RatingsForm from "../../components/form";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import NotFound from "../../components/404";

interface MovieDetails {
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
}

interface DetailsPageProps {
  data: MovieDetails;
}

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:7000/search/${id}`);
  const { data, success } = await res.json();

  return {
    props: { data: success ? data : { success: false } },
  };
}

const DetailsPage: NextPage<DetailsPageProps> = ({ data }) => {
  const { title, fullplot, imdb, genres, cast, year, poster } = data;
  const [formActive, setFormActive] = useState<boolean>(false);
  const [isRated, setIsRated] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const ratedMovieArray = localStorage.getItem("ratedMovies");
    if (!ratedMovieArray) return;
    setIsRated(JSON.parse(ratedMovieArray).includes(id));
  }, [id, formActive]);

  return (
    <>
      {data._id ? (
        <div className="flex justify-center align-middle">
          <Head>
            <title>{title}</title>
          </Head>
          <main className="flex flex-col md:flex-row">
            <div className="img md:w-2/6">
              <Image
                src={poster ? poster : not_found_img}
                alt="poster"
                width={400}
                height={550}
              />
            </div>
            <div className="details flex flex-col md:w-4/6 ml-2 md:ml-10">
              <h1 className="text-base md:text-2xl font-bold">
                {title} ({year})
              </h1>
              <div className="genres flex my-4">
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
              <div className="cast flex my-4">
                <h3 className="font-bold text-xl mr-2">Cast - </h3>
                {cast ? (
                  cast.map((item, idx) => {
                    return (
                      <div
                        className="text-green-400 mr-3 underline font-bold hover:text-green-500"
                        key={`${item}_${idx}_${Date.now()}`}
                      >
                        <Link href={`/byactor/${item}`}>
                          <a>{item}</a>
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
                <span>⭐ {imdb ? imdb.rating : 0}</span>
              </div>
              <div className="plot text-sm text-gray-800">
                {fullplot
                  ? fullplot.split(" ").slice(0, 140).join(" ")
                  : "No Description found for this movie!"}
              </div>
              {isRated ? (
                <button className="mt-auto mb-2 cursor-not-allowed flex align-middle justify-center bg-gray-500 text-white hover:bg-gray-600 p-2 w-full font-bold rounded-md">
                  <span className="material-icons mr-3">star_rate</span> Already
                  Rated
                </button>
              ) : (
                <button
                  onClick={() => setFormActive(!formActive)}
                  className="mt-auto mb-2 flex align-middle justify-center bg-blue-500 text-white hover:bg-blue-600 p-2 w-full font-bold rounded-md"
                >
                  <span className="material-icons mr-3">star_rate</span> Rate
                  this Movie
                </button>
              )}
            </div>
          </main>
          <RatingsForm
            active={formActive}
            closeForm={() => setFormActive(false)}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default DetailsPage;
