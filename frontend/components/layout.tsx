/* eslint-disable @next/next/no-page-custom-font */
import styles from "../styles/Home.module.css";
import type { NextPage } from "next";
import Navbar from "./navbar";
import Head from "next/head";
import Preloader from "./preloader";
import { useState, useEffect } from "react";
import { BASE_SERVER_URL } from "../constants/urls";
import { getValue, setValue } from "../helpers/localStorageHandler";

const Layout: NextPage = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    checkServerConnection();
  }, []);

  async function checkServerConnection() {
    const res = await fetch(BASE_SERVER_URL);
    const { success, uid } = await res.json();
    if (success) {
      setIsConnected(true);
      const currentUid = getValue("uid");
      if (!currentUid) setValue("uid", uid);
    } else setIsConnected(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Preloader isActive={!isConnected} message="Loading..." />
    </div>
  );
};

export default Layout;
