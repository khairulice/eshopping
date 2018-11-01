import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import { history } from './_common';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

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
        const { user } = this.props;
        let dt=new Date();
        let fb = firebase.database().ref('GuestRequest');
        fb.push({
            service: e.currentTarget.dataset.id,
            status: 'Open',
            gid: user.email,
            dt_created: dt.toString() 
        });
        console.log(new Date());
    }

    render() {
        const { loggedIn } = this.props;
        let list = this.state.products.map(p => {
            return (
                <li key={p.key} data-id={p.Name} onClick={this.handleGuestRequest.bind(this)} className="list-group-item active">
                    {p.Name}
                </li>

                // <Button bsStyle="primary" bsSize="large" key={p.key} data-id={p.Name} block onClick={this.handleGuestRequest.bind(this)}>
                //     {p.Name}
                // </Button>
                // <div className="service" key={p.key} href="#" onClick={this.handleGuestRequest}>{p.Name}</div>
            )
        });

        // Add locale-specific relative date/time formatting rules.
        TimeAgo.locale(en)
 
        // Create relative date/time formatter.
        const timeAgo = new TimeAgo('en-US')

        let actions = this.state.actions.map(a => {
            return (
                <li key={a.key} data-id={a.Name} className="list-group-item">                  
                   <div> {a.action} </div> 
                   <div className="time">{timeAgo.format(new Date(a.dt_created))}</div>                       
                </li>               
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
                            <div className="col-md-6 col-sm-12">
                                <div className="title1"> Quick Service</div>
                                <ul className="list-group service">
                                    {list}
                                    <li className="list-group-item active">
                                        Other
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="title1">Message</div>
                                <ul className="list-group">
                                    {actions}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}



function mapStateToProps(state) {
    const { loggedIn, user } = state.loginReducer;
    return {
        loggedIn,
        user
    };
}

const connectedHome = connect(mapStateToProps)(Home);
export { connectedHome as Home };
