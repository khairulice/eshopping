import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MainMenu } from "../header";
import {Footer} from "../footer";

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (             
            <div>
                <section className="navbar custom-navbar navbar-fixed-top" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <button className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon icon-bar"></span>
                        <span className="icon icon-bar"></span>
                        <span className="icon icon-bar"></span>
                    </button>
                    <a href="/" className="navbar-brand">Self Service 7/24</a>
                </div>
                <div className="collapse navbar-collapse">                                       
                </div>
            </div>
        </section>               
                <section data-stellar-background-ratio="0.5" className="conent-height">
                    <Component {...props} />
                </section>
                <Footer/>
            </div>            
    )} />
)