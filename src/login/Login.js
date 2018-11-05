import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
    }

    render() {

        return (
            <div className="container topmargin">
                <div className="row">
                    <div className="col-md-offset-4 col-md-3 col-sm-12">
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
                                bsStyle="primary"
                                disabled={!this.validateForm()}
                                type="submit">
                                Login
          </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
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