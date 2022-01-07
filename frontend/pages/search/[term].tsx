import { BASE_SERVER_URL } from "../../constants/urls";
import { Movie } from "../../components/searchBar";
import MovieCard from "../../components/movieCard";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";

interface SearchPageProps {
  data: Array<Movie>;
}

export async function getServerSideProps(context: any) {
  const { term } = context.params;
  const res = await fetch(
    `${BASE_SERVER_URL}/autocomplete?term=${term}&limit=50`
  );
  const { data } = await res.json();
  return {
    props: { data: data ? data : [] },
  };
}

const SearchResults: NextPage<SearchPageProps> = ({ data }) => {
  const router = useRouter();
  const { term } = router.query;

  return (
    <div>
      <Head>
        <title>Search - {term}</title>
      </Head>
      <main className="flex flex-col">
        <h2 className="text-xl font-bold my-3 flex align-middle">
          <span className="underline">
            <span className="text-blue-500">{`"${term}"`}</span> - {data.length}{" "}
            matching results found!
          </span>
        </h2>
        {data.map((item) => {
          return <MovieCard key={item._id} data={item} />;
        })}
      </main>
    </div>
  );
};

export default SearchResults;
