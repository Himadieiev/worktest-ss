import React from "react";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={`${css.header} container`}>
      <h1 className={css.title}>To Do List App</h1>
      <button type="button" className={css.btn}>
        Add To Do
      </button>
    </header>
  );
};

export default Header;
