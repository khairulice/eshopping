import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import firebase from 'firebase';
import _ from 'lodash';
import { Grid, Row, Col, Table } from 'react-bootstrap'
import AddProduct from "./AddProduct";
import { connect } from 'react-redux';

export default class Product extends Component {
    constructor(props) {
        super(props);
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
            return (
                  <tr>                    
                    <td>{p.Name}</td>
                    <td>{p.Type}</td>
                    <td>{p.Status}</td>                                   
                  </tr>                  
               )
        })
        return (
            
            <Grid>
            <Row>
              <Col xs={12} md={12}>
               <AddProduct />
               <Table responsive>
                <thead>
                  <tr>                   
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>                                    
                  </tr>
                </thead>
                <tbody>
              {list}
              </tbody>
              </Table>
              </Col>              
            </Row>
          </Grid>
          )
    }
}


function mapStateToProps(state) {
    const { alert } = state;
    return {
      alert
    };
  }
  
  const connectedProduct = connect(mapStateToProps)(Product);
  export { connectedProduct as Product }; 
  