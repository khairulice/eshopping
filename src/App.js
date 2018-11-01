import React, { Component } from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from "firebase";
import { history } from './_common';
import { Home } from "./home";
import { Login } from './login';
import { PublicRoute,ProtectedRoute } from "./_common";
import { Service } from "./service";
import {GuestRequest, Guest} from "./guest";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

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
        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
        <Router history={history}>
          <div>  
            <ProtectedRoute exact path="/" component={Home} />            
            <PublicRoute path="/login" component={Login} />
            {/* <PublicRoute path="/signup" component={Signup} /> */}
            <ProtectedRoute path="/store" component={Service} />
            <ProtectedRoute path="/request" component={GuestRequest} />            
            <ProtectedRoute path="/guest" component={Guest} />
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
