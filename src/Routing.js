import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from "./Home";
import Product from "./Product";
import Order from "./Order";
  

const Routing = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>      
      <Route path='/product' component={Product}/>
      <Route path='/order' component={Order}/>
    </Switch>
  </main>
)

export default Routing;