import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import Navbar from "./navbar";
import Head from "next/head";

const Layout: NextPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />
      <main className="pt-20">{children}</main>
    </div>
  );
};

export default Layout;
