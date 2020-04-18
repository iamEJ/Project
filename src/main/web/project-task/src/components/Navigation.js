import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar bg="light" variant="light">
          <Link to={"/"} className="navbar-brand">
            Project Management System
          </Link>

          <Nav className="mr-auto">
            <Link to={"/projects"} className="nav-link">
              Project List
            </Link>
            <Link to={"/"} className="nav-link">
              Task List
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>
        <div className="container">
          <Link to={"/projectForm"} className="btn btn-primary mt-3">
            <FontAwesomeIcon icon={faPlusCircle} /> Create Project
          </Link>
        </div>
      </div>
    );
  }
}
export default Navigation;
