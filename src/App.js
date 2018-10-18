import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Routing from './Routing'
import { BrowserRouter } from 'react-router-dom'
import firebase from "firebase";
import {Grid, Col } from 'react-bootstrap'

class App extends Component {
  constructor() {
    super();
    var config = {
      apiKey: "",
      authDomain: "vehicle-registration-19db3.firebaseapp.com",
      databaseURL: "https://vehicle-registration-19db3.firebaseio.com",
      projectId: "vehicle-registration-19db3",
      storageBucket: "vehicle-registration-19db3.appspot.com",
      messagingSenderId: "496722656921"
    };
    firebase.initializeApp(config);
  }
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Col xs={12} md={12}>
            <BrowserRouter>
              <Routing />
            </BrowserRouter>
          </Col>
        </Grid>
      </div>)
  }
}
export default App;
