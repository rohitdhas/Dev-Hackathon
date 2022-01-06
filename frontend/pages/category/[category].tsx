import { Movie } from "../../components/searchBar";
import MovieCard from "../../components/movieCard";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

interface PageProps {
  data: Array<Movie>;
}

export async function getServerSideProps(context: any) {
  const { category } = context.params;
  const res = await fetch(`http://localhost:7000/category/${category}`);
  const { data } = await res.json();
  return {
    props: { data: data ? data : [] },
  };
}

const MoviesByActorsPage: NextPage<PageProps> = ({ data }) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div>
      <Head>
        <title>Search by - {category}</title>
      </Head>
      <main className="flex flex-col">
        <h2 className="text-xl font-bold my-3 flex align-middle">
          <span className="underline">
            Movies in <span className="text-blue-500">{`"${category}"`}</span>{" "}
            category - {data.length} results found!
          </span>
        </h2>
        {data.map((item) => {
          return <MovieCard key={item._id} data={item} />;
        })}
      </main>
    </div>
  );
};

export default MoviesByActorsPage;
