import { useRouter } from "next/router";
import Searchbar from "./searchBar";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="md:px-20 shadow-lg flex align-middle justify-between bg-green-400 absolute top-0 left-0 right-0 p-1">
      <span className="my-auto text-xl hover:text-slate-200 cursor-pointer font-bold text-white">
        <Link href="/">
          <a>
            {router.pathname === "/" ? (
              <h1>MovieFlixer</h1>
            ) : (
              <h1 className="flex align-middle">
                <span className="material-icons mr-1 my-auto">
                  chevron_left
                </span>{" "}
                Back Home
              </h1>
            )}
          </a>
        </Link>
      </span>
      <main className="flex flex-col">
        <Searchbar />
      </main>
    </nav>
  );
};

export default Navbar;
