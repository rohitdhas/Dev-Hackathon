import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import illustration from "../public/movie_illustration.svg";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main className="flex flex-col">
        <div className="mt-10 flex-col justify-center align-center">
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
              Search for your favorite movies and shows....
            </h1>
            <div className="btn h-min w-fit mx-auto">
              <Link href="/random">
                <a>
                  <button className="flex justify-center align-middle bg-blue-500 text-white font-bold hover:bg-blue-600 cursor-pointer mx-auto p-5 w-72 mt-10 rounded-md">
                    Start Exploring
                    <span className="material-icons ml-2">play_arrow</span>
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-white text-xs md:text-base absolute bottom-0 right-0 left-0 text-right font-bold py-2 md:py-3 md:px-20 px-4 bg-gray-700">
        Built by{" "}
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
      </footer>
    </div>
  );
};

export default Home;
