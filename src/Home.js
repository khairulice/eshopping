import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import { history } from './_common';

export default class Home extends Component {
    handleSignup=()=>{
        history.push('/signup');
    }
    handleLogin=()=>{
        history.push('/login');
    }
    render() {
        return (
            <section id="home" data-stellar-background-ratio="0.5">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6 col-sm-12">
                            <div className="home-info">                                
                                <h1>We help you manage your Warranty Cards successfully!</h1>
                                <form action="" method="get" className="online-form">
                                    {/* <input type="email" name="email" className="form-control" placeholder="Enter your email" required="" /> */}
                                    <button type="submit" className="form-control" onClick={this.handleSignup}>Signup</button>
                                    <button type="submit" className="form-control" onClick={this.handleLogin}>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
