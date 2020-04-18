import React, { Component } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import cx from "classnames";
import { Link } from "react-router-dom";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
    };
  }

  componentDidMount() {
    this.findAllProjects();
  }

  findAllProjects = () => {
    axios
      .get("http://localhost:8080/api/projects")
      .then((res) => res.data)
      .then((data) => {
        this.setState({ projects: data });
      });
  };

  deleteProject = (projectId) => {
    axios
      .delete("http://localhost:8080/api/projects/" + projectId)
      .then((res) => {
        if (res.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);

          this.setState({
            projects: this.state.projects.filter(
              (project) => project.id !== projectId
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div className="mt-2">
          The number of projects:{" "}
          <span className="text-white bg-success pr-1 pl-1 rounded">
            {this.state.projects.length}
          </span>
        </div>
        <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <MyToast
            show={this.state.show}
            message={"The project was deleted successfully."}
          />
        </div>
        <Row>
          {this.state.projects.length === 0 ? (
            <h1>There are no projects</h1>
          ) : (
            this.state.projects.map((project) => (
              <Col sm={12} md={6} lg={4}>
                <Card
                  className={"mt-3 text-center bg-light"}
                  style={{ height: "300px" }}
                >
                  <Card.Header as="h3" className={"bg-dark text-white"}>
                    {project.projectTitle}{" "}
                    <div
                      className={cx("text-uppercase", {
                        "text-secondary ": project.status === "todo",
                        "text-success ": project.status === "done",
                        "text-primary ": project.status === "in_progress",
                      })}
                    >
                      <h6>{project.status}</h6>
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text>{project.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className={"bg-dark text-white"}>
                    <Link
                      to={"edit/" + project.id}
                      className="btn btn-primary mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </Link>

                    <Button
                      variant="danger"
                      onClick={this.deleteProject.bind(this, project.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  }
}
export default ProjectList;
