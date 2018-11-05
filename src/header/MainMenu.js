import React from 'react';
import { connect } from 'react-redux';
import { loginActions } from '../_actions';

class MainMenu extends React.Component {
   
    handleLogout = event => {

        const { dispatch } = this.props;
        dispatch(loginActions.logout());
    }

    render() {
        const { loggedIn, user } = this.props;      

        return (<section className="navbar custom-navbar navbar-fixed-top" role="navigation">
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
                    <ul className="nav navbar-nav">
                        <li><a href="/" className="smoothScroll">Home</a></li>
                        <li><a href="/store" className="smoothScroll">Services</a></li>
                        <li><a href="/guest" className="smoothScroll">Guest</a></li>
                        <li><a href="/request" className="smoothScroll">Request</a></li>                        
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            {!loggedIn
                                ? <span>
                                    <a href="/login">Login</a>
                                    <a href="/signup">Signup</a>
                                </span>
                                : <span>
                                    <span className="welcome">{user.email}</span>
                                    <a href="/logout" onClick={this.handleLogout}>Logout</a>
                                </span>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </section>)
    }
}


function mapStateToProps(state) {
    const { loggedIn, user } = state.loginReducer;
    return {
        loggedIn,
        user
    };
}

const connectedMainMenu = connect(mapStateToProps)(MainMenu);
export { connectedMainMenu as MainMenu };
