import React from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Project from "../Pages/Project";
import Authenticate from "../Auth/Authenticate";
import PageError from "../shared/components/PageError";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import MyProjects from "../Pages/MyProjects";
import UserAccount from "../Pages/Account";

const Routes = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/authenticate" />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/authenticate" component={Authenticate} />
        <Route path="/projects" component={MyProjects} />
        <Route path="/account" component={UserAccount} />
        <Route path="/project/:id" component={Project} />
        <Route component={PageError} />
      </Switch>
    </Router>
  );
};

export default Routes;
