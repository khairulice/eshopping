import React, { Component } from 'react';
import firebase from 'firebase';
import _ from 'lodash';
import { ListGroup, ListGroupItem, Panel, Button, Table, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux';
import {alertActions} from './_actions'
import {history} from './_common'
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

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
                    .set({ status: "Serving", service:snapshot.val().service,dt_created:snapshot.val().dt_created });
                    alertActions.success('Served');

                    let dt=new Date();

                let ga = firebase.database().ref('GuestRequestAction');
                ga.push({
                    action: `Serving ${snapshot.val().service} soon.`,
                    rqid: snapshot.key,
                    dt_created: dt.toString() 
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
                    .set({ status: "Completed", service:snapshot.val().service,dt_created:snapshot.val().dt_created });    
                    
                    alertActions.success('Completed');
            });

    }

    render() {     
        
        // Add locale-specific relative date/time formatting rules.
        TimeAgo.locale(en)
 
        // Create relative date/time formatter.
        const timeAgo = new TimeAgo('en-US')

        let list = this.state.requests.map(req => {           
            return (
                <li key={req.key} className= {req.status=="Serving"?"list-group-item serving": req.status =="Completed"?"list-group-item completed":"list-group-item"}>
                    <div className="row">
                        <div className="col-md-6">
                       <div> Requesting {req.service} at Room-708 </div> 
                       <div className="time">{timeAgo.format(new Date(req.dt_created))}</div>
                        </div>
                        <div className="col-md-2">
                            {req.status}
                        </div>
                        <div className="col-md-4">                                 
                            <Button bsStyle="success margin2px action-holder" data-id={req.key} onClick={this.handleGuestRequestComplete.bind(this)}>
                            <Glyphicon glyph="ok" />
                            </Button>
                            <Button bsStyle="info margin2px action-holder" data-id={req.key} onClick={this.handleGuestRequestServe.bind(this)}>
                            <Glyphicon glyph="send" />
                            </Button>                                                   
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
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedProduct = connect(mapStateToProps)(GuestRequest);
export { connectedProduct as GuestRequest };
