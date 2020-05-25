import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

class Navigation extends Component {
  render() {
    return (
      <div style={{marginBottom:"70px",color:"#4e4039"}} className="navHover" >
        <Navbar bg="white fixed-top text-dark d-flex justify-content-between"    style={{boxShadow: "0px 0px 10px  rgba(12,13,0,0.2)"}}>
          <Link to={"/"} className="navbar-brand navHover " style={{color:"#eb5d1e",fontSize:"26px"}}>
            PATMSA
          </Link>

      <div style={{marginRight:"200px"}}>
         <Nav className="mr-auto ">
              <Link to={"/"} className={"nav-link navHover"}>
               Home
            </Link>
            <Link to={"/projectForm"} className={"nav-link navHover"}>
               Create Project
            </Link>

            <Link to={"/projects"} className="nav-link navHover">
              Project List
            </Link>
            <Link to={"/tasks"} className="nav-link navHover">
              Task List
            </Link>
          </Nav>
      </div>
          

        </Navbar>
        
      </div>
    );
  }
}
export default Navigation;
