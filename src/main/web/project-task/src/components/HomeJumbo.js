import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import ProjectList from "./ProjectList";
import { Link } from "react-router-dom";

class HomeJumbo extends Component {
  render() {
    return (
      <div>
        <Jumbotron className="text-center font-weight-light">
          <p style={{ fontSize: "50px" }}>Welcome</p>
          <p
            className="text-secondary pb-4 w-50 font-weight-light"
            style={{ margin: "0 auto", fontSize: "20px" }}
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don't simply skip over it entirely.
          </p>
          <div className="d-flex justify-content-center">
            <Link
              to={"/projectForm"}
              className={"nav-link btn btn-primary mr-1"}
              style={{ width: "140px" }}
            >
              Create Project
            </Link>
            <Link
              to={"/task-form"}
              className={"nav-link btn btn-secondary"}
              style={{ width: "140px" }}
            >
              Create Task
            </Link>
          </div>
        </Jumbotron>
        <div>
          <ProjectList />
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    );
  }
}

export default HomeJumbo;
