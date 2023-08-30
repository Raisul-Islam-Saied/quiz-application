import React from "react";
import Navbar from "./Navbar";
import style from "./styles/Layaout.module.css";
function Layaout({ children }) {
  return (
    <>
      <Navbar />
      <main className={style.main}>
        <div className={style.container}>{children}</div>
      </main>
    </>
  );
}

export default Layaout;
