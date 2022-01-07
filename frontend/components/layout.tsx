import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import Navbar from "./navbar";
import Head from "next/head";
import Preloader from "./preloader";
import { useState, useEffect } from "react";

const Layout: NextPage = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkServerConnection();
  }, []);

  async function checkServerConnection() {
    const res = await fetch("http://localhost:7000");
    const { success } = await res.json();
    if (success) setIsConnected(true);
    else setIsConnected(false);
  }

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
      <Preloader isActive={!isConnected} />
    </div>
  );
};

export default Layout;
