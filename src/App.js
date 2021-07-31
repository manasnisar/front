import React from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router-dom'
import history from "./history";
import { connect } from "react-redux";

import SignIn from './Pages/SignIn/SignIn';
import { isAuth } from './redux/auth/auth-actions'




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAuthenticated: null
    };
  }

  componentDidMount() {
    this.props.isAuth(history)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });
    if (nextProps.user) {
      this.setState({
        user: { ...nextProps.user }
      });
    }
  }


  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/signin' component={SignIn} />
          {
            !this.state.isAuthenticated ?
            <Route path='/' component={SignIn} /> : null
          }

          {
            this.state.isAuthenticated && this.state.user.role === "admin" ?
              <Switch>
                <Route path='/' exact component={SignIn} />
              </Switch> : null
          }
          {
            this.state.isAuthenticated && this.state.user.role === "user" ?
              <Switch>
                <Route path='/' component={SignIn} />
              </Switch> : null
          }
        </Switch>
      </Router>
    );
  }
}



const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});

export default connect(
  mapStateToProps,
  { isAuth }
)(App);