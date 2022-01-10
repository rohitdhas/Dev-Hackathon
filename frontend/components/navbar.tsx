import { useRouter } from "next/router";
import Searchbar from "./searchBar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "../styles/navbar.module.scss";
import Preloader from "./preloader";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(false);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      setDropdownActive(false);
    });
  }, []);

  useEffect(() => {
    setIsPreloaderActive(false);
  }, [router.pathname]);

  function toggleDropdown(e: any) {
    e.stopPropagation();
    setDropdownActive(!dropdownActive);
  }

  function routeTo(path: string) {
    if (router.pathname === path) return;
    setIsPreloaderActive(true);
    router.push({ pathname: path });
  }

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
      <main className="flex">
        <div className="flex flex-col">
          <Searchbar />
        </div>
        <div className="dropdown my-auto ml-2 mr-auto relative">
          <span
            onClick={(e) => toggleDropdown(e)}
            className="dropd_icon material-icons text-4xl cursor-pointer hover:text-gray-300 text-white"
          >
            pending
          </span>
          <ul
            onClick={(e) => e.stopPropagation()}
            className={`${
              dropdownActive ? styles.dropdownActive : styles.dropdown
            } shadow-lg p-2 rounded-md text-white font-bold bg-slate-600 w-max absolute right-0 mt-4`}
          >
            <li
              onClick={() => routeTo("/purchases")}
              className="rounded-sm flex justify-between my-auto p-2 hover:bg-slate-500 cursor-pointer"
            >
              <p className="mr-4">Purchases</p>
              <span className="material-icons text-green-500">sell</span>
            </li>
            <li
              onClick={() => routeTo("/favorites")}
              className="rounded-sm flex justify-between my-auto p-2 hover:bg-slate-500 cursor-pointer"
            >
              <p className="mr-4">Favorites</p>
              <span className="material-icons text-red-500">favorite</span>
            </li>
          </ul>
        </div>
      </main>
      <Preloader isActive={isPreloaderActive} message="Fetching Page Data.. " />
    </nav>
  );
};

export default Navbar;
