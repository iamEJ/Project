import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faUndo, faList } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class Project extends Component {
  _isMounted = false;

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
  };

  componentDidMount() {
    this._isMounted = true;
    const projectId = this.props.match.params.id;
    if (this._isMounted && projectId) {
      this.findAProjectById(projectId);
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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

  updateProject = (e) => {
    e.preventDefault();

    const project = {
      id: this.state.id,
      projectTitle: this.state.projectTitle,
      description: this.state.description,
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
    const { projectTitle, description } = this.state;

    return (
      <div className="container" style={{ height: "81vh" }}>
        <div
          style={{ display: this.state.show ? "block" : "none" }}
          className=" d-flex align-middle"
        >
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "The project was updated successfully."
                : "The project was added successfully."
            }
          />
        </div>
        <Card
          style={{
            width: "600px",
            margin: "0 auto",
            marginTop: "50px",
            marginBottom: "100px",
            boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",
            borderRadius: "0",
            borderTop: "4px solid #eb5d1e",
            borderBottom: "4px solid #eb5d1e",
          }}
        >
          <Card.Header
            className={"text-center font-weight-bold"}
            style={{ background: "#fef8f5", color: "#4e4039" }}
          >
            <p style={{ fontSize: "40px" }}>
              {this.state.id ? "Update Project" : " Add Project"}
            </p>
          </Card.Header>
          <Form
            onReset={this.resetProject}
            onSubmit={this.state.id ? this.updateProject : this.submitProject}
            id="projectFormId"
          >
            <Card.Body style={{ color: "#4e4039" }}>
              <Form.Group controlId="formProjectTitle">
                <Form.Label className="font-weight-bold mt-3">
                  Project Name
                </Form.Label>
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
                <Form.Label className="font-weight-bold mt-3">
                  Description
                </Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  type="text"
                  rows="3"
                  placeholder="Enter a description for the project"
                  name="description"
                  value={description}
                  onChange={this.projectChange}
                  style={{ height: "200px" }}
                />
              </Form.Group>
            </Card.Body>

            <Card.Footer style={{ textAlign: "right", background: "#fef8f5" }}>
              <Button
                type="submit"
                style={{ background: "#eb5d1e", border: "1px solid #eb5d1e" }}
              >
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button
                type="reset"
                style={{ background: "#4e4039", border: "1px solid #4e4039" }}
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                type="button"
                onClick={this.projectList.bind()}
                style={{ background: "#4e4039", border: "1px solid #4e4039" }}
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
