import React, { Component } from 'react';
import { Route ,Redirect} from 'react-router-dom';
import { Authentication } from "../SecureMenu";

export const UserLayout = ({ component: Component, ...rest }) => (
      <Route {...rest} render={props => (
        localStorage.getItem('user') ?
           <div>              
              <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
                  <div className="container">

                      <div className="navbar-header">
                          <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                              <span className="icon icon-bar"></span>
                              <span className="icon icon-bar"></span>
                              <span className="icon icon-bar"></span>
                          </button>

                          <a href="/" className="navbar-brand">Warranty Store</a>
                      </div>

                      <div className="collapse navbar-collapse">
                          <ul className="nav navbar-nav">
                              <li><a href="/" className="smoothScroll">Home</a></li>
                              <li><a href="/store" className="smoothScroll">Store</a></li>
                          </ul>
                          <ul className="nav navbar-nav navbar-right">
                              <li><Authentication></Authentication></li>
                      </ul>
                  </div>

                      </div>
                   </section>
                  <section data-stellar-background-ratio="0.5" className="conent-height">
                      <Component {...props} />
                  </section>

                  <footer id="footer" data-stellar-background-ratio="0.5">
                      <div className="container">
                          <div className="row">

                              <div className="copyright-text col-md-12 col-sm-12">
                                  <div className="col-md-6 col-sm-6">
                                      <p>Copyright &copy; 2018 Company Name:
                         <a rel="nofollow" href="/">Warranty Store</a></p>
                                  </div>

                                  <div className="col-md-6 col-sm-6">
                                      <ul className="social-icon">
                                          <li><a href="#" className="fa fa-facebook-square" attr="facebook icon"></a></li>
                                          <li><a href="#" className="fa fa-twitter"></a></li>
                                          <li><a href="#" className="fa fa-instagram"></a></li>
                                      </ul>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </footer>
              </div>     
              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />         
      )} />
  )