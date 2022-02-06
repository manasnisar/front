import React, { Fragment } from "react";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import Toast from "./Toast";
import Routes from "./Routes";
import history from "../browserHistory";
import "./fontStyles.css";

const App = () => {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <Toast />
      <Routes history={history} />
    </Fragment>
  );
};

export default App;
