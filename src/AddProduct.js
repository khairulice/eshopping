import React, { Component } from 'react';
import firebase from "firebase";
import { Modal, Button, Popover, Tooltip, OverlayTrigger } from "react-bootstrap";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Price: 0,
            Quantity: 0,
            show: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
        this.setState({ [name]: value });
    }

    handleSubmit(event) {       
        event.preventDefault();
        let fb = firebase.database().ref('Product');
        fb.push({
            Name: this.state.Name,
            Price: this.state.Price,
            Quantity: this.state.Quantity
        });

        this.setState({ show: false });
    }

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

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
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Product Name:
                        <input
                                    name="Name"
                                    type="text"
                                    value={this.state.Name}
                                    onChange={this.handleChange} />
                            </label><br />
                            <label>
                                Price :
                        <input
                                    name="Price"
                                    type="number"
                                    value={this.state.Price}
                                    onChange={this.handleChange} />
                            </label><br />
                            <label>
                                Quantity :
                        <input
                                    name="Quantity"
                                    type="number"
                                    value={this.state.Quantity}
                                    onChange={this.handleChange} />
                            </label>                         
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
};
