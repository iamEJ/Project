import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

class Navigation extends Component {
  render() {
    return (
      <div className="text-white">
        <Navbar bg="dark text-white" variant="light">
          <Link to={"/"} className="navbar-brand text-white">
            Project Management System
          </Link>

          <Nav className="mr-auto">
            <Link to={"/projectForm"} className={"nav-link text-white"}>
              <FontAwesomeIcon icon={faPlusCircle} /> Create Project
            </Link>

            <Link to={"/projects"} className="nav-link text-white">
              Project List
            </Link>
            <Link to={"/tasks"} className="nav-link text-white">
              Task List
            </Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}
export default Navigation;
