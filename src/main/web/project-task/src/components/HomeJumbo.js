import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import project from "./research.png";

class HomeJumbo extends Component {
  render() {
    return (
      <div>
        <Jumbotron
          className="text-left"
          style={{ height: "770px", background: "	#fef8f5", marginTop: "-20px" }}
        >
          <Container fluid>
            <Row>
              <Col style={{ marginTop: "50px" }}>
                <div>
                  <p
                    style={{
                      fontSize: "40px",
                      color: "#4e4039",
                      width: "400px",
                      lineHeight: "40px",
                      marginLeft: "200px",
                    }}
                    className="mt-5 font-weight-bold"
                  >
                    Welcome to project management system
                  </p>
                  <p
                    className="font-weight-light"
                    style={{
                      fontSize: "20px",
                      width: "75%",
                      marginLeft: "200px",
                      color: "#4e4039",
                      marginTop: "10px",
                    }}
                  >
                    Something short and leading about the collection below—its
                    contents, the creator, etc. Make it short and sweet, but not
                    too short so folks don't simply skip over it entirely.
                  </p>
                  <div className="d-flex">
                    <Link
                      to={"/projectForm"}
                      className={"nav-link btn text-white mr-1"}
                      style={{
                        width: "140px",
                        marginLeft: "200px",
                        background: "#eb5d1e",
                        marginTop: "30px",
                      }}
                    >
                      Create Project
                    </Link>
                  </div>
                </div>
              </Col>
              <Col style={{ marginTop: "20px" }}>
                <div style={{ width: "300px" }}>
                  <img
                    src={project}
                    alt="Logo"
                    title="Welcome"
                    style={{
                      width: "400px",
                      marginTop: "50px",
                      marginLeft: "100px",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <h1 style={{ fontSize: "40px", color: "#4e4039" }}>
            What you can do here:
          </h1>
        </div>
        <hr style={{ border: "2px solid #eb5d1e", width: "100px" }} />
        <br />
        <div
          className="d-flex justify-content-start"
          style={{
            color: "#4e4039",
            marginLeft: "400px",
            marginBottom: "100px",
          }}
        >
          <ul>
            <li>
              <h5>Create new project and view the projets list </h5>
            </li>
            <li>
              <h5>Create tasks for the project</h5>
            </li>
            <li>
              <h5>View the tasks list and task board</h5>
            </li>
            <li>
              <h5>Create, update, delete and search for projects and tasks</h5>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HomeJumbo;
