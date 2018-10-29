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
        const { loggedIn, user } = this.props;        
        console.log(loggedIn);
        if (!loggedIn) {
            return (<span>
                <a href="/login">Login</a>
                <a href="/signup">Signup</a>
            </span>)
        }
        else {
    return (<span> {user.email}
                <a href="#" onClick={this.handleLogout}>Logout</a>
            </span>)
        }
    }
}


function mapStateToProps(state) {
    const { loggedIn,user } = state.loginReducer;
    return {
        loggedIn,
        user
    };
}

const connectedAuthentication = connect(mapStateToProps)(Authentication);
export { connectedAuthentication as Authentication };
