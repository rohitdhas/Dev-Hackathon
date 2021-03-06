import React from "react";
import styles from "../styles/preloader.module.scss";

interface Props {
  isActive: boolean;
  message: string;
}

const Preloader: React.FC<Props> = ({ isActive, message }) => {
  return (
    <>
      {isActive ? (
        <>
          <div className="fixed m-0 p-0 top-0 left-0 right-0 bottom-0 flex justify-center align-middle bg-slate-700 opacity-70"></div>
          <div className="fixed flex xy-45per">
            <div className={styles.loading_animation}></div>
            <div className="ml-3 my-auto text-xl">
              <span className="font-bold text-white">{message}</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Preloader;
