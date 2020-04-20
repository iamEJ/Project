import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faSave,
  faUndo,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.projectChange = this.projectChange.bind(this);
    this.submitProject = this.submitProject.bind(this);
  }

  initialState = {
    id: "",
    projectTitle: "",
    description: "",
    status: "todo",
  };

  componentDidMount() {
    const projectId = this.props.match.params.id;
    if (projectId) {
      this.findAProjectById(projectId);
    }
  }

  findAProjectById = (projectId) => {
    axios
      .get("http://localhost:8080/api/projects/" + projectId)
      .then((res) => {
        if (res.data != null) {
          this.setState({
            id: res.data.id,
            projectTitle: res.data.projectTitle,
            description: res.data.description,
            status: res.data.status,
          });
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  submitProject = (e) => {
    e.preventDefault();

    const project = {
      projectTitle: this.state.projectTitle,
      description: this.state.description,
      status: this.state.status,
    };

    axios.post("http://localhost:8080/api/projects", project).then((res) => {
      if (res.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  updateProject = (e, id) => {
    e.preventDefault();

    const project = {
      id: this.state.id,
      projectTitle: this.state.projectTitle,
      description: this.state.description,
      status: this.state.status,
    };

    axios
      .put(`http://localhost:8080/api/projects/${this.state.id}`, project)
      .then((res) => {
        if (res.data != null) {
          this.setState({ show: true, method: "put" });
          setTimeout(() => this.setState({ show: false }), 3000);
          setTimeout(() => this.projectList(), 3000);
        } else {
          this.setState({ show: false });
        }
      });
    this.setState(this.initialState);
  };

  projectChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetProject = () => {
    this.setState(() => this.initialState);
  };

  projectList = () => {
    return this.props.history.push("/projects");
  };

  render() {
    const { projectTitle, description, status } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "The project was updated successfully."
                : "The project was added successfully."
            }
          />
        </div>
        <Card style={{ width: "60%", margin: "0 auto", marginTop: "10px" }}>
          <Card.Header>
            <h1 className={"text-center"}>
              {" "}
              <FontAwesomeIcon icon={faProjectDiagram} />{" "}
              {this.state.id ? "Update Project" : " Add Project"}
            </h1>
          </Card.Header>
          <Form
            onReset={this.resetProject}
            onSubmit={this.state.id ? this.updateProject : this.submitProject}
            id="projectFormId"
          >
            <Card.Body>
              <Form.Group controlId="formProjectTitle">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  placeholder="Enter project name"
                  name="projectTitle"
                  value={projectTitle}
                  onChange={this.projectChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  type="text"
                  rows="3"
                  placeholder="Enter a description for the project"
                  name="description"
                  value={description}
                  onChange={this.projectChange}
                />
              </Form.Group>
              <Form.Group controlId="formStatus" name="status">
                <Form.Label>Select Status</Form.Label>
                <Form.Control
                  required
                  as="select"
                  custom
                  name="status"
                  value={status}
                  onChange={this.projectChange}
                >
                  <option>todo</option>
                  <option>in_progress</option>
                  <option>done</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right" }}>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button variant="primary" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                variant="primary"
                type="button"
                onClick={this.projectList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> Projects
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Project;
