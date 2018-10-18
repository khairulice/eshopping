import React, { Component } from 'react';
import firebase from "firebase";
import { Modal, Button, Popover, Tooltip, OverlayTrigger, FormGroup, ControlLabel, FormControl, HelpBlock } from "react-bootstrap";

export default class AddProduct extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            product:{
                Name: '',
                Price: 0,
                Quantity: 0
            },
            value: '',                               
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }


    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;    
        
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                [name]:value
            }
        }))
       
    }

    handleSubmit(event) {
        event.preventDefault();
        let fb = firebase.database().ref('Product');
        console.log(this.state.product);
        fb.push({
            Name: this.state.product.Name,
            Price: this.state.product.Price,
            Quantity: this.state.product.Quantity
        });

        this.setState({
            product:{
            Name: '',
            Price: 0,
            Quantity: 0,
            show: false
        }});
    }


    getValidationState() {
        const length = this.state.Name.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }


    render() {
        return (
            <div>
                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                    Add New Product
                 </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form>
                            <FormGroup
                                controlId="NameFG"
                            >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="Name"
                                    value={this.state.product.Name}
                                    placeholder="Enter name"
                                    onChange={this.handleChange}
                                />
                                <FormControl.Feedback />
                                <HelpBlock>Name must be 5 digits</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                controlId="PriceFG"
                            >
                                <ControlLabel>Price</ControlLabel>
                                <FormControl
                                    type="number"
                                    name="Price"
                                    value={this.state.product.Price}
                                    placeholder="Enter price"
                                    onChange={this.handleChange}
                                />

                            </FormGroup>
                            <FormGroup
                                controlId="QuantityFG"
                            >
                                <ControlLabel>Quantity</ControlLabel>
                                <FormControl
                                    type="number"
                                    name="Quantity"
                                    value={this.state.product.Quantity}
                                    placeholder="Enter quantity"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                        <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}