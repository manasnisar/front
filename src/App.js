import React from 'react';
import { Switch, Route, Router } from 'react-router-dom'

import history from "./history";
import { connect } from "react-redux";

import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
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

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.user) {
      return {
        user: { ...nextProps.user },
        isAuthenticated: nextProps.isAuthenticated
      }
    }else{
      return {
        isAuthenticated: nextProps.isAuthenticated
      }
    }
  }


  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/' exact component={SignIn} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          
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