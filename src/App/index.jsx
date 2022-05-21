import React, { Fragment, useEffect } from "react";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import Toast from "./Toast";
import Routes from "./Routes";
import history from "../browserHistory";
import "./fontStyles.css";
import { connectSocket } from "../redux/socket/socket-reducer";
import { connect } from "react-redux";

const App = ({connect}) => {
  useEffect(() => {
    connect();
  },[connect])
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <Toast />
      <Routes history={history} />
    </Fragment>
  );
};


const mapDispatchToProps = dispatch => ({
  connect: () => dispatch(connectSocket())
});

export default connect(null, mapDispatchToProps)(App);