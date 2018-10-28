import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel,Jumbotron } from "react-bootstrap";
import { connect } from 'react-redux';
import { loginActions } from '../_actions';

export default class Login extends Component {
    constructor(props) {
        super(props);

         // reset login status
        this.props.dispatch(loginActions.logout());
        this.state = {
            email: "",
            password: "",
            submitted: false
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
        this.setState({ submitted: true });
        const { email, password } = this.state;
        const { dispatch } = this.props;
        if (email && password) {
            dispatch(loginActions.login(email, password));
        }

        // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ...
        //     console.log(error.message);
        //   });

        //   firebase.auth().onAuthStateChanged(function(user) {
        //     if (user) {
        //       // User is signed in.
        //       console.log(user.email);
        //       var displayName = user.displayName;
        //       var email = user.email;
        //       var emailVerified = user.emailVerified;
        //       var photoURL = user.photoURL;
        //       var isAnonymous = user.isAnonymous;
        //       var uid = user.uid;
        //       var providerData = user.providerData;
        //       localStorage.setItem("currentUser",user);
        //       // ...
        //     } else {
        //       // User is signed out.
        //       // ...
        //     }
        //   });


    }

    render() {
        const { loggingIn } = this.props;
        const { email, password, submitted } = this.state;

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
                    Login
          </Button>
            </form>
        </div>);
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.loginReducer;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(Login);
export { connectedLoginPage as Login }; 