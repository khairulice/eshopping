import React from 'react';
import { connect } from 'react-redux';
import { loginActions } from '../_actions';

class Authentication extends React.Component {
    constructor(props) {
        super(props);

    }

    handleLogout = event => {       
       
        const { dispatch } = this.props;
        dispatch(loginActions.logout());         
    }   

    render() {
        const { loggedIn } = this.props;        
        console.log(loggedIn);
        if (!loggedIn) {
            return (<span>
                <a href="/login">Login</a>
                <a href="/signup">Signup</a>
            </span>)
        }
        else {
            return (<span>
                <a href="#" onClick={this.handleLogout}>Logout</a>
            </span>)
        }
    }
}


function mapStateToProps(state) {
    const { loggedIn } = state.loginReducer;
    return {
        loggedIn
    };
}

const connectedAuthentication = connect(mapStateToProps)(Authentication);
export { connectedAuthentication as Authentication };
