import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import { history } from './_common';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            actions: []
        }
    }
    handleSignup = () => {
        history.push('/signup');
    }
    handleLogin = () => {
        history.push('/login');
    }

    componentDidMount() {
        var pRef = firebase.database().ref('Product');
        pRef.on('value', snapshot => {
            this.processServices(snapshot.val());
        })

        var pRef = firebase.database().ref('GuestRequestAction');
        pRef.on('value', snapshot => {
            this.processRequestActions(snapshot.val());
        })
    }

    processRequestActions(values) {
        let messagesVal = values;
        let messages = _(messagesVal)
            .keys()
            .map(messageKey => {
                let cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                return cloned;
            })
            .value();
        this.setState({
            actions: messages
        });
    }
    processServices(values) {
        let messagesVal = values;
        let messages = _(messagesVal)
            .keys()
            .map(messageKey => {
                let cloned = _.clone(messagesVal[messageKey]);
                cloned.key = messageKey;
                return cloned;
            })
            .value();
        this.setState({
            products: messages
        });
    }
    handleGuestRequest = (e) => {
        let fb = firebase.database().ref('GuestRequest');       
        fb.push({
            service: e.target.text
        });
    }

    render() {
        const { loggedIn } = this.props;

        let list = this.state.products.map(p => {
            return (
                <ListGroupItem bsStyle="info" key={p.name} href="#" onClick={this.handleGuestRequest}>{p.Name}</ListGroupItem>
            )
        });   
        
        let reply = this.state.actions.map(a => {
            return (
                <div className="info"> Serving {a.service} soon</div>
            )
        });     

        return (
            !loggedIn ?
                <section id="home" data-stellar-background-ratio="0.5">
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6 col-sm-12">
                                <div className="home-info">
                                    <div>
                                        <h1>How can you help you</h1>
                                        <form action="" method="get" className="online-form">
                                            {/* <input type="email" name="email" className="form-control" placeholder="Enter your email" required="" /> */}
                                            <button type="submit" className="form-control" onClick={this.handleSignup}>Signup</button>
                                            <button type="submit" className="form-control" onClick={this.handleLogin}>Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : <div> <div className="overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-offset-3 col-md-6 col-sm-12">
                                <Panel>
                                    <Panel.Heading>Services</Panel.Heading>
                                    <Panel.Body>
                                     {reply}
                                        <ListGroup>
                                            {list}
                                        </ListGroup>
                                    </Panel.Body>                                    
                                </Panel>                               
                            </div>
                        </div>
                    </div>
                </div>

        )
    }
}



function mapStateToProps(state) {
    const { loggedIn } = state.loginReducer;
    return {
        loggedIn
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
