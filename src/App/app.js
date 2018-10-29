import React, { Component } from 'react';
import './app.css';
import { Router,Route } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase";
import { loginActions } from '../_actions';
import { history } from '../_common';
import { Home } from "../Home";
import { Login } from '../login';
import  {Signup}  from '../signup';
import { UserLayout } from "../_common";
import { Product } from "../Product";

class App extends Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      //dispatch(loginActions.logout());
  });  

    const { dispatch } = this.props;
    //dispatch(loginActions.logout());

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
            <UserLayout exact path="/" component={Home} />
            <UserLayout path="/store" component={Product} />
            <UserLayout path="/login" component={Login} />
            <UserLayout path="/signup" component={Signup} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
