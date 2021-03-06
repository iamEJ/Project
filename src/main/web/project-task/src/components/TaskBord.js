import React, { Component } from "react";
import { Card, Button, Modal, Form, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPencilAlt, faSortDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

export default class TaskBord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
      editTaskData: {
        id: "",
        taskName: "",
        description: "",
        priority: "",
        status: "",
      },
      editTaskModal: false,
      deleteTaskModal: false,
    };
  }

  editTask = (id, taskName, description, priority, status) => {
    this.setState({
      editTaskData: { id, taskName, description, priority, status },
      editTaskModal: !this.state.newTaskModal,
    });
  };

  toggleEditTaskModal = () => {
    this.setState({
      editTaskModal: !this.state.editTaskModal,
    });
  };

  toggleDeleteTaskModal = (rowId) => {
    this.setState({
      deleteTaskModal: !this.state.deleteTaskModal,
      tmpId: rowId,
    });
  };

  updateTask() {
    let { taskName, description, priority, status } = this.state.editTaskData;

    axios
      .put(
        `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/${this.state.editTaskData.id}`,
        {
          taskName,
          description,
          priority,
          status,
        }
      )
      .then((res) => {
        this._refreshTask();

        this.setState({
          editTaskModal: false,
          editTaskData: {
            id: "",
            taskName: "",
            description: "",
            priority: "",
            status: "",
          },
        });
      });
  }

  deleteTask = (taskId) => {
    axios
      .delete(
        `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/${this.state.tmpId}`
      )
      .then((res) => {
        console.log(res);

        if (res.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);

          this.setState({
            deleteTaskModal: false,
            tasks: this.state.tasks.filter((task) => task.id !== taskId),
          });
        } else {
          this.setState({ show: false });
        }

        this._refreshTask();
      });
  };

  componentDidMount() {
    this._refreshTask();
  }

  _refreshTask() {
    axios
      .get(
        `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks`
      )
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.setState({ tasks: data });
      })
      .catch((error) => {
        console.log("Error - " + error);
      });
  }

  render() {
    return (
      <div>
        <>
          {/* ///////////////DELETE MODAL /////////////// */}

          <Modal
            show={this.state.deleteTaskModal}
            onHide={this.toggleDeleteTaskModal.bind(this)}
          >
            <Modal.Header closeButton style={{ background: "#fef8f5" }}>
              <Modal.Title style={{ color: "#4e4039" }}>
                Deleting Task
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p style={{ color: "#4e4039" }}>Do you want to delete task?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button
                style={{ background: "#eb5d1e", border: "1px solid #eb5d1e" }}
                onClick={this.deleteTask.bind(this)}
              >
                Delete
              </Button>
              <Button
                style={{ background: "#4e4039", border: "1px solid #4e4039" }}
                onClick={this.toggleDeleteTaskModal.bind(this)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={this.state.editTaskModal}
            onHide={this.toggleEditTaskModal.bind(this)}
            style={{ borderRadius: "none", color: "#4e4039" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit new Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formTaskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    required
                    type="text"
                    placeholder="Enter task name"
                    name="taskName"
                    value={this.state.editTaskData.taskName}
                    onChange={(e) => {
                      let { editTaskData } = this.state;
                      editTaskData.taskName = e.target.value;
                      this.setState({ editTaskData });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    type="text"
                    rows="3"
                    name="description"
                    value={this.state.editTaskData.description}
                    onChange={(e) => {
                      let { editTaskData } = this.state;
                      editTaskData.description = e.target.value;
                      this.setState({ editTaskData });
                    }}
                    placeholder="Enter a description for the task"
                  />
                </Form.Group>
                <Form.Group controlId="formPriority">
                  <Form.Label>Select Priority</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    name="priority"
                    className="form-control"
                    value={this.state.editTaskData.priority}
                    onChange={(e) => {
                      let { editTaskData } = this.state;
                      editTaskData.priority = e.target.value;
                      this.setState({ editTaskData });
                    }}
                  >
                    <option></option>
                    <option>low</option>
                    <option>medium</option>
                    <option>hight</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formStatus">
                  <Form.Label>Select Status</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    custom
                    name="status"
                    className="form-control"
                    value={this.state.editTaskData.status}
                    onChange={(e) => {
                      let { editTaskData } = this.state;
                      editTaskData.status = e.target.value;
                      this.setState({ editTaskData });
                    }}
                  >
                    <option></option>
                    <option>todo</option>
                    <option>in_progress</option>
                    <option>done</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ background: "#eb5d1e", border: "1px solid #eb5d1e" }}
                onClick={this.updateTask.bind(this)}
              >
                Update Task
              </Button>
              <Button
                style={{ background: "#4e4039", border: "1px solid #4e4039" }}
                onClick={this.toggleEditTaskModal.bind(this)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        <Card>
          <Card.Header className="text-left " style={{ background: "#fef8f5" }}>
            <Link
              to={`/projects/${this.props.match.params.id}`}
              className="btn text-white"
              style={{ background: "#4e4039", border: "1px solid #4e4039" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Link>
          </Card.Header>

          <Card.Body>
            <div className="container">
              <h1 className="text-center mb-0" style={{ color: "#4e4039" }}>
                Task Board
              </h1>

              <br />
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <div className="text-center mb-4">
                      <div
                        className="btn "
                        style={{
                          cursor: "default",
                          borderBottom: "5px solid #eb5d1e",
                          borderRadius: "0",
                          width: "210px",
                        }}
                      >
                        <h3 style={{ color: "#4e4039" }}>To Do</h3>
                      </div>
                    </div>
                    {this.state.tasks.map((task) => {
                      if (task.status === "todo") {
                        return (
                          <Card
                            key={task.id}
                            style={{
                              width: "100%",
                              marginBottom: "14px",
                              boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",
                              color: "#4e4039",
                            }}
                          >
                            <Accordion defaultActiveKey="0">
                              <Card style={{ borderRadius: "0" }}>
                                <Card.Header
                                  className="p-0 d-flex justify-content-between "
                                  style={{ background: "#fff" }}
                                >
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="1"
                                    className="text-capitalize bg-white"
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <h5
                                      style={{ color: "#4e4039" }}
                                      className="h5Hover"
                                    >
                                      {task.taskName}{" "}
                                      <FontAwesomeIcon icon={faSortDown} />
                                    </h5>
                                  </Accordion.Toggle>

                                  <div
                                    className="btn iconHover "
                                    style={{
                                      width: "50px",
                                      borderRadius: "0",
                                      height: "50px",
                                      color: "#fff",
                                    }}
                                    title="Edit"
                                    onClick={this.editTask.bind(
                                      this,
                                      task.id,
                                      task.taskName,
                                      task.description,
                                      task.priority,
                                      task.status
                                    )}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilAlt}
                                      style={{ marginTop: "10px" }}
                                    />
                                  </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                  <Card.Body>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Priority:{" "}
                                      </span>
                                      <span
                                        style={{ color: "#eb5d1e" }}
                                        className="text-uppercase font-weight-bold"
                                      >
                                        {task.priority}
                                      </span>
                                    </p>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Start:{" "}
                                      </span>
                                      {task.startDate}{" "}
                                      <span className="font-weight-bold">
                                        {" "}
                                        End:{" "}
                                      </span>
                                      {task.finishDate}
                                    </p>
                                    <p>
                                      <span className="font-weight-bold">
                                        Description:{" "}
                                      </span>
                                      {task.description}
                                    </p>

                                    <br />
                                    <hr />
                                    <div className="d-flex justify-content-end">
                                      <Button
                                        style={{
                                          background: "#eb5d1e",
                                          border: "1px solid #eb5d1e",
                                        }}
                                        size="sm"
                                        onClick={this.toggleDeleteTaskModal.bind(
                                          this,
                                          task.id
                                        )}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </Card>
                        );
                      }
                    })}
                  </div>
                  <div className="col-md-4">
                    <div className=" text-center mb-4">
                      <div
                        className="btn text-white"
                        style={{
                          cursor: "default",
                          borderBottom: "5px solid #eb5d1e",
                          borderRadius: "0",
                          width: "100%",
                        }}
                      >
                        <h3 style={{ color: "#4e4039" }}>In Progress</h3>
                      </div>
                    </div>
                    {this.state.tasks.map((task) => {
                      if (task.status === "in_progress") {
                        return (
                          <Card
                            key={task.id}
                            style={{
                              width: "100%",
                              marginBottom: "14px",
                              boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",
                              color: "#4e4039",
                            }}
                          >
                            <Accordion defaultActiveKey="0">
                              <Card style={{ borderRadius: "0" }}>
                                <Card.Header className="p-0 d-flex justify-content-between bg-white">
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="1"
                                    className="text-capitalize bg-white"
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <h5
                                      style={{ color: "#4e4039" }}
                                      className="h5Hover"
                                    >
                                      {task.taskName}{" "}
                                      <FontAwesomeIcon icon={faSortDown} />
                                    </h5>
                                  </Accordion.Toggle>
                                  <div
                                    className="btn iconHover"
                                    style={{
                                      width: "50px",
                                      borderRadius: "0",
                                      height: "50px",
                                      color: "#fff",
                                    }}
                                    title="Edit"
                                    onClick={this.editTask.bind(
                                      this,
                                      task.id,
                                      task.taskName,
                                      task.description,
                                      task.priority,
                                      task.status
                                    )}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilAlt}
                                      style={{ marginTop: "10px" }}
                                    />
                                  </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                  <Card.Body>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Priority:{" "}
                                      </span>
                                      <span
                                        style={{ color: "#eb5d1e" }}
                                        className="text-uppercase font-weight-bold"
                                      >
                                        {task.priority}
                                      </span>
                                    </p>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Start:{" "}
                                      </span>
                                      {task.startDate}{" "}
                                      <span className="font-weight-bold">
                                        {" "}
                                        End:{" "}
                                      </span>
                                      {task.finishDate}
                                    </p>
                                    <p>
                                      <span className="font-weight-bold">
                                        Description:{" "}
                                      </span>
                                      {task.description}
                                    </p>
                                    <br />
                                    <hr />
                                    <div className="d-flex justify-content-end">
                                      <Button
                                        style={{
                                          background: "#eb5d1e",
                                          border: "1px solid #eb5d1e",
                                        }}
                                        size="sm"
                                        onClick={this.toggleDeleteTaskModal.bind(
                                          this,
                                          task.id
                                        )}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </Card>
                        );
                      }
                    })}
                  </div>
                  <div className="col-md-4">
                    <div className=" text-center mb-4">
                      <div
                        className="btn text-white "
                        style={{
                          cursor: "default",
                          borderBottom: "5px solid #eb5d1e",
                          borderRadius: "0",
                          width: "210px",
                        }}
                      >
                        <h3 style={{ color: "#4e4039" }}>Done</h3>
                      </div>
                    </div>
                    {this.state.tasks.map((task) => {
                      if (task.status === "done") {
                        return (
                          <Card
                            key={task.id}
                            style={{
                              width: "100%",
                              marginBottom: "14px",
                              boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",
                              color: "#4e4039",
                            }}
                          >
                            <Accordion defaultActiveKey="0">
                              <Card style={{ borderRadius: "0" }}>
                                <Card.Header className="p-0 d-flex justify-content-between bg-white">
                                  <Accordion.Toggle
                                    as={Card.Header}
                                    eventKey="1"
                                    className=" text-capitalize bg-white"
                                    style={{
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <h5
                                      style={{ color: "#4e4039" }}
                                      className="h5Hover"
                                    >
                                      {task.taskName}{" "}
                                      <FontAwesomeIcon icon={faSortDown} />
                                    </h5>
                                  </Accordion.Toggle>
                                  <div
                                    className="btn iconHover"
                                    style={{
                                      width: "50px",
                                      borderRadius: "0",
                                      height: "50px",
                                      color: "#fff",
                                    }}
                                    title="Edit"
                                    onClick={this.editTask.bind(
                                      this,
                                      task.id,
                                      task.taskName,
                                      task.description,
                                      task.priority,
                                      task.status
                                    )}
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilAlt}
                                      style={{ marginTop: "10px" }}
                                    />
                                  </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                  <Card.Body>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Priority:{" "}
                                      </span>
                                      <span
                                        style={{ color: "#eb5d1e" }}
                                        className="text-uppercase font-weight-bold"
                                      >
                                        {task.priority}
                                      </span>
                                    </p>
                                    <p style={{ fontSize: "12px" }}>
                                      <span className="font-weight-bold">
                                        Start:{" "}
                                      </span>
                                      {task.startDate}{" "}
                                      <span className="font-weight-bold">
                                        {" "}
                                        End:{" "}
                                      </span>
                                      {task.finishDate}
                                    </p>
                                    <p>
                                      <span className="font-weight-bold">
                                        Description:{" "}
                                      </span>
                                      {task.description}
                                    </p>
                                    <br />
                                    <hr />
                                    <div className="d-flex justify-content-end">
                                      <Button
                                        style={{
                                          background: "#eb5d1e",
                                          border: "1px solid #eb5d1e",
                                        }}
                                        size="sm"
                                        onClick={this.toggleDeleteTaskModal.bind(
                                          this,
                                          task.id
                                        )}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Card.Body>
                                </Accordion.Collapse>
                              </Card>
                            </Accordion>
                          </Card>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
