import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { ListGroup, ListGroupItem, Panel, Button, Table } from 'react-bootstrap'
import { connect } from 'react-redux';
import {alertActions} from './_actions'
import {history} from './_common'

export default class GuestRequest extends Component {
    constructor(props) {
        super(props);
        
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
        
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

    handleGuestRequestServe = (e) => {
        let fb = firebase.database().ref('GuestRequest').orderByKey().equalTo(e.currentTarget.dataset.id).on("child_added",
            function (snapshot) {

                firebase.database().ref().child('/GuestRequest/' + e.currentTarget.dataset.id)
                    .set({ status: "Serving", service:snapshot.val().service });
                    alertActions.success('Served');

                let ga = firebase.database().ref('GuestRequestAction');
                ga.push({
                    action: `Serving ${snapshot.val().service} soon.`,
                    rqid: snapshot.key
                });
            });


    }
    handleGuestRequestComplete = (e) => {
        // let ga = firebase.database().ref('GuestRequestAction').orderByChild('rqid').equalTo(e.currentTarget.dataset.id).on("child_added",
        //     function (snapshot) {
        //         firebase.database().ref('GuestRequestAction/' + snapshot.key).remove();
        //     });

        // let fb = firebase.database().ref('GuestRequest/' + e.currentTarget.dataset.id);
        // fb.remove();

        let fb = firebase.database().ref('GuestRequest').orderByKey().equalTo(e.currentTarget.dataset.id).on("child_added",
            function (snapshot) {

                firebase.database().ref().child('/GuestRequest/' + e.currentTarget.dataset.id)
                    .set({ status: "Completed", service:snapshot.val().service });    
                    
                    alertActions.success('Completed');
            });

    }

    render() {
        const { alert } = this.props;
        let list = this.state.requests.map(req => {           
            return (
                <li key={req.key} className= {req.status=="Serving"?"list-group-item active": req.status =="Completed"?"list-group-item completed":"list-group-item"}>
                    <div className="row">
                        <div className="col-md-7">
                        Requesting {req.service} at Room-708
                        </div>
                        <div className="col-md-2">
                            {req.status}
                        </div>
                        <div className="col-md-3">
                            <Button bsStyle="info" data-id={req.key} onClick={this.handleGuestRequestServe.bind(this)}>Serve</Button>
                            <Button bsStyle="success" data-id={req.key} onClick={this.handleGuestRequestComplete.bind(this)}>Complete</Button>
                        </div>
                    </div>
                </li>
            )
        })
        return (<div> <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-12">                    
                        <div className="title1"> Request in Queue</div>
                        <ul className="list-group">
                            {list}
                        </ul>
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
