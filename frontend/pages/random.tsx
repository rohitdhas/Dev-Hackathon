import { Movie } from "../components/searchBar";
import MovieCard from "../components/movieCard";
import type { NextPage } from "next";
import Head from "next/head";

interface PageProps {
  data: Array<Movie>;
}

export async function getServerSideProps(context: any) {
  const res = await fetch(`http://localhost:7000/random`);
  const { data } = await res.json();
  return {
    props: { data: data ? data : [] },
  };
}

const Random: NextPage<PageProps> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Random Movies</title>
      </Head>
      <main className="flex flex-col">
        <h2 className="text-2xl font-bold my-3 flex align-middle">
          <span className="underline">Random Results</span>
        </h2>
        {data.map((item: Movie) => (
          <MovieCard key={item._id} data={item} />
        ))}
      </main>
    </div>
  );
};

export default Random;
