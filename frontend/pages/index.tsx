import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import illustration from "../public/movie_illustration.svg";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/preloader.module.scss";

const Home: NextPage = () => {
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="my-auto h-75vh flex flex-col justify-center align-center">
        <div className="img pointer-events-none w-fit mx-auto">
          <Image
            height={200}
            className="-z-10"
            src={illustration}
            alt="movie"
          />
        </div>
        <div className="flex flex-col justify-center align-middle">
          <h1 className="md:text-3xl lg:text-4xl font-black mt-10 text-center">
            Search for your favorite{" "}
            <span className="text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
              movies
            </span>{" "}
            and{" "}
            <span className="text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
              shows
            </span>
            ....
          </h1>
          <div className="btn h-min w-fit mx-auto">
            <Link href="/random">
              <a>
                <button
                  onClick={() => setIsBtnClicked(true)}
                  className="flex justify-center align-middle bg-blue-500 text-white font-bold hover:bg-blue-600 cursor-pointer mx-auto p-5 w-72 mt-10 rounded-md"
                >
                  {isBtnClicked ? (
                    <>
                      <p>Fetching Results</p>
                      <span
                        className={`${styles.loading_animation_btn} ml-2 my-auto`}
                      ></span>
                    </>
                  ) : (
                    <>
                      <p>Start Exploring</p>
                      <span className="material-icons ml-2">play_arrow</span>
                    </>
                  )}
                </button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <footer className="text-white text-sm absolute bottom-0 right-0 left-0 text-center py-2 md:py-3 md:px-20 px-4 bg-gray-700">
        <div className="font-semibold">
          👨‍💻 Built by{" "}
          <a
            href="https://www.linkedin.com/in/rohit-dhas-26b68215a/"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            Rohit Dhas
          </a>{" "}
          for{" "}
          <a
            href="https://dev.to/devteam/announcing-the-mongodb-atlas-hackathon-on-dev-4b6m"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            DEV Hackathon
          </a>{" "}
          with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            Next JS
          </a>{" "}
          +{" "}
          <a
            href="https://www.mongodb.com/atlas/database"
            target="_blank"
            rel="noreferrer"
            className="text-green-400 hover:underline"
          >
            MongoDB
          </a>
        </div>
        <div className="mt-1 text-xs font-semibold text-slate-400">
          💪🏻 Powered by
          <a
            href="https://www.mongodb.com/atlas/database"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline"
          >
            {" "}
            MongoDB Atlas
          </a>{" "}
          services like
          <a
            href="https://www.mongodb.com/atlas/search"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline"
          >
            {" "}
            Atlas Search
          </a>
          ,
          <a
            href="https://docs.mongodb.com/realm/triggers/database-triggers/"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline"
          >
            {" "}
            Realm Triggers
          </a>{" "}
          and
          <a
            href="https://docs.mongodb.com/realm/functions/"
            target="_blank"
            rel="noreferrer"
            className="text-green-600 hover:underline"
          >
            {" "}
            Realm Functions
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
