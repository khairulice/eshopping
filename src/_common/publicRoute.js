import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MainMenu } from "../header";
import {Footer} from "../footer";

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (             
            <div>
                <MainMenu></MainMenu>                
                <section data-stellar-background-ratio="0.5" className="conent-height">
                    <Component {...props} />
                </section>
                <Footer/>
            </div>            
    )} />
)