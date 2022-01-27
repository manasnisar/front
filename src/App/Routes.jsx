import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";

import history from "../browserHistory";
import Project from "../Pages/Project";
import Authenticate from "../Auth/Authenticate";
import PageError from "../shared/components/PageError";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import MyProjects from "../Pages/MyProjects";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Redirect exact from="/" to="/authenticate" />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/authenticate" component={Authenticate} />
      <Route path="/myprojects" component={MyProjects} />
      <Route path="/project" component={Project} />
      <Route component={PageError} />
    </Switch>
  </Router>
);

export default Routes;
