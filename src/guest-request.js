import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { ListGroup, ListGroupItem, Panel } from 'react-bootstrap'
import AddProduct from "./AddProduct";
import { connect } from 'react-redux';

export default class GuestRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: []
        }
    }
    componentDidMount() {
        var pRef = firebase.database().ref('GuestRequest');
        pRef.on('value', snapshot => {
            this.getData(snapshot.val());
        })
    }

    getData(values) {
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
            requests: messages
        });
    }
    handleGuestRequestAction = (e) => {
        let fb = firebase.database().ref('GuestRequestAction');        
        fb.push({
            service: e.currentTarget.dataset.id
        });
    }

    render() {
        let list = this.state.requests.map(req => {
            return (

                <ListGroupItem bsStyle="info" data-id={req.service} onClick={this.handleGuestRequestAction.bind(this)} href="#">Room-708 is calling {req.service}</ListGroupItem>
            )
        })
        return (<div> <div className="overlay"></div>
        <div className="container">
            <div className="row">
                <div className="col-md-offset-3 col-md-6 col-sm-12">
                    <Panel>
                        <Panel.Heading>Requests in Queue</Panel.Heading>
                        <Panel.Body>
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
    const { alert } = state;
    return {
        alert
    };
}

const connectedProduct = connect(mapStateToProps)(GuestRequest);
export { connectedProduct as GuestRequest };
