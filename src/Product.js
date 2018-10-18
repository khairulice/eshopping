import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import firebase from 'firebase';
import _ from 'lodash';
import AddProduct from "./AddProduct";

export default class Product extends Component {
    constructor() {
        super();
        this.state = {
            products: []
        }
    }
    componentDidMount() {
        var pRef = firebase.database().ref('Product');
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
            products: messages
        });
    }

    render() {
        let list = this.state.products.map(p => {
            return (<Jumbotron key={p.key}>
                <h2>
                    {p.Name}
                </h2>
            </Jumbotron>)
        })
        return (<div>
            <div>
                <AddProduct />
            </div>
            <div>
                {list}
            </div>
        </div>)
    }
}
