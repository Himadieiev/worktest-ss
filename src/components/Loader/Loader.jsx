import React from "react";
import { Hourglass } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <Hourglass height="50" width="50" ariaLabel="hourglass-loading" />
    </div>
  );
};

export default Loader;
