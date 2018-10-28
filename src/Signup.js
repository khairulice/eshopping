import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel,Jumbotron } from "react-bootstrap";
import firebase from "firebase";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error.message);
          });

    }

    render() {
        return (<div className="login col-md-offset-3 col-md-6 col-sm-12 topmargin">
            <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="email" bsSize="small">
                    <ControlLabel>
                        Email
                    </ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="small">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                >
                    Signup
          </Button>
            </form>
        </div>);
    }
}