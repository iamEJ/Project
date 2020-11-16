import React, { Component } from "react";
import { Card, Button, Modal, Row, Container, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import { Link } from "react-router-dom";
import "../App.css";
import { CSVLink } from "react-csv";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      search: null,
      deleteProjectModal: false,
    };
  }

  toggleDeleteProjectModal = (rowId) => {
    this.setState({
      deleteProjectModal: !this.state.deleteProjectModal,
      tmpId: rowId,
    });
  };

  componentDidMount() {
    this.findAllProjects();
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({ search: keyword });
  };

  findAllProjects = () => {
    axios.get("http://localhost:8080/api/projects").then((res) => {
      this.setState({ projects: res.data });
    });
  };

  deleteProject = (projectId) => {
    axios
      .delete(`http://localhost:8080/api/projects/${this.state.tmpId}`)
      .then((res) => {
        if (res.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);

          this.setState({
            deleteProjectModal: false,
            projects: this.state.projects.filter(
              (project) => project.id !== projectId
            ),
          });
        } else {
          this.setState({ show: false });
        }
        this.findAllProjects();
      });
  };

  render() {
    const csvData = this.state.projects;

    return (
      <div className="container" style={{ marginBottom: "120px" }}>
        {/* ///////////////DELETE MODAL /////////////// */}

        <Modal
          show={this.state.deleteProjectModal}
          onHide={this.toggleDeleteProjectModal.bind(this)}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#4e4039" }}>
              Deleting Project
            </Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ color: "#4e4039" }}>
            <p>Do you want to delete project?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              style={{ background: "#eb5d1e", border: "1px solid #eb5d1e" }}
              onClick={this.deleteProject.bind(this)}
            >
              Delete
            </Button>
            <Button
              style={{ background: "#4e4039", border: "1px solid #4e4039" }}
              onClick={this.toggleDeleteProjectModal.bind(this)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row>
            <Col>
              <div className="mb-2 d-flex justify-content-start ">
                <h3 style={{ marginTop: "20px", color: "#4e4039" }}>
                  The number of projects:{" "}
                  <span
                    className="badge"
                    style={{ color: "#fff", background: "#4e4039" }}
                  >
                    {this.state.projects.length}
                  </span>
                </h3>
              </div>
              <div className="container-fluid d-flex justify-content-start mb-4">
                <input
                  type="text"
                  className="form-control border border-dark mainLoginInput"
                  placeholder="&#61442; Search for Project"
                  style={{ width: "260px" }}
                  onChange={(e) => this.searchSpace(e)}
                />
              </div>
            </Col>
            <Col>
              <div
                style={{ marginTop: "40px" }}
                className="container-fluid d-flex justify-content-center "
              >
                <Link
                  to={"/projectForm"}
                  className={"nav-link text-white btn mr-1"}
                  style={{ background: "#eb5d1e" }}
                >
                  Create Project
                </Link>

                <CSVLink
                  data={csvData}
                  style={{ width: "120px", background: "#4e4039" }}
                  className="nav-link btn text-white"
                  filename={"projectsList.csv"}
                  title={"Download Projects CSV"}
                >
                  Project CSV
                </CSVLink>
              </div>
            </Col>
          </Row>
        </Container>

        <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <MyToast
            show={this.state.show}
            message={"The project was deleted successfully."}
          />
        </div>

        {this.state.projects.length === 0 ? (
          <h1
            style={{ color: "#4e4039", textAlign: "center", marginTop: "50px" }}
          >
            <hr style={{ borderBottom: "2px solid #eb5d1e" }} />
            There are no projects
          </h1>
        ) : (
          this.state.projects
            .filter((data) => {
              if (this.state.search == null) return data;
              else if (
                data.projectTitle
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((project) => (
              <Card
                key={project.id}
                style={{
                  width: "100%",
                  marginBottom: "14px",
                  boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",
                }}
              >
                <div>
                  <Link
                    style={{ fontSize: "20px", marginLeft: "10px" }}
                    to={"projects/" + project.id}
                    className="titleHover text-capitalize"
                  >
                    {project.projectTitle}{" "}
                  </Link>
                  <div style={{ float: "right", width: "140px" }}>
                    <Link
                      to={"edit/" + project.id}
                      className="btn mr-1 mt-2 iconHover"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </Link>
                    <Link
                      to={"/projects"}
                      className="btn mt-2 iconHover"
                      title="Delete"
                      onClick={this.toggleDeleteProjectModal.bind(
                        this,
                        project.id
                      )}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Link>{" "}
                    <Link
                      to={"projects/" + project.id}
                      className="btn mr-1 mt-2 iconHover"
                      title="View"
                    >
                      <FontAwesomeIcon icon={faEnvelopeSquare} />
                    </Link>
                  </div>

                  <p
                    style={{ fontSize: "10px", marginLeft: "10px" }}
                    className="text-uppercase font-weight-bold"
                  >
                    {project.completeTasks === project.allTasks ? (
                      <span style={{ color: "#eb5d1e" }}>done</span>
                    ) : (
                      <span style={{ color: "#4e4039" }}>in_progress</span>
                    )}{" "}
                    <span
                      className="badge"
                      style={{ background: "#4e4039", color: "#fff" }}
                    >
                      {project.completeTasks}/{project.allTasks}
                    </span>
                  </p>
                </div>

                <p style={{ color: "#878787", marginLeft: "10px" }}>
                  {project.description}
                </p>
              </Card>
            ))
        )}
      </div>
    );
  }
}
export default ProjectList;
