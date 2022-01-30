import React, { Fragment, useEffect } from "react";

import NormalizeStyles from "./NormalizeStyles";
import BaseStyles from "./BaseStyles";
import Toast from "./Toast";
import Routes from "./Routes";
import history from "../browserHistory";

import "./fontStyles.css";
import useApi from "../shared/hooks/api";
import { setUser } from "../redux/user/user-reducer";
import { connect } from "react-redux";
import Mangekyo from "../shared/components/Loaders/Mangekyo";

const App = ({ setUser }) => {
  const [{ data, isLoading }] = useApi.get(
    "/auth",
    {},
    { cachePolicy: "no-cache" }
  );
  useEffect(() => {
    async function checkAuth() {
      if (data) {
        setUser(data.user);
        history.push("/projects");
      } else {
        history.push("/signin");
      }
    }

    checkAuth();
  }, [data, history]);
  return (
    <div>
      {isLoading ? (
        <Mangekyo />
      ) : (
        <Fragment>
          <NormalizeStyles />
          <BaseStyles />
          <Toast />
          <Routes history={history} />
        </Fragment>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(App);
