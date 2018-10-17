import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends Component{
    render(){
        return(
            <Navbar inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="/">eShop</a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="/product">
                    Product
                  </NavItem>
                  <NavItem eventKey={2} href="/order">
                    Order
                  </NavItem>
                  <NavDropdown eventKey={3} title="Services" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">
                   About Us
                  </NavItem>                 
                </Nav>
              </Navbar.Collapse>
            </Navbar>)
    }
}