import React, { Component } from 'react';
import './app.css';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase";
import { loginActions } from '../_actions';
import { history } from '../_common';
import { Home } from "../Home";
import { Login } from '../login';
import { Signup } from '../signup';
import { PublicRoute,ProtectedRoute } from "../_common";
import { Product } from "../Product";
import GuestRequest from "../guest-request";

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      //dispatch(loginActions.logout());
    });    

    var config = {
      apiKey: "AIzaSyApnZVKy-1FuPVrPVOfVd9lsJwKGpby9GQ",
      authDomain: "vehicle-registration-19db3.firebaseapp.com",
      databaseURL: "https://vehicle-registration-19db3.firebaseio.com",
      projectId: "vehicle-registration-19db3",
      storageBucket: "vehicle-registration-19db3.appspot.com",
      messagingSenderId: "496722656921"
    };
    firebase.initializeApp(config);
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        <Router history={history}>
          <div>
            <PublicRoute exact path="/" component={Home} />            
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <ProtectedRoute path="/store" component={Product} />
            <ProtectedRoute path="/request" component={GuestRequest} />            
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { loggedIn } = state.loginReducer;
  return {
    alert,
    loggedIn
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
