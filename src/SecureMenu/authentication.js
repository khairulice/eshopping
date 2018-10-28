import React from 'react';
import { connect } from 'react-redux';

class Authentication extends React.Component {
    constructor(props) {
        super(props);
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
                <a href="/logout">Logout</a>
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
