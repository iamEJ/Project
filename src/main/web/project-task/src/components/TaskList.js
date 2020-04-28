import React, { Component } from "react";
import { Card, Table, Button } from "react-bootstrap";
import MyToast from "./MyToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    this.findAllProjects();
  }

  findAllProjects = () => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((res) => res.data)
      .then((data) => {
        this.setState({ tasks: data });
      });
  };

  deleteTask = (taskId) => {
    axios.delete("http://localhost:8080/api/tasks/" + taskId).then((res) => {
      if (res.data != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);

        this.setState({
          tasks: this.state.tasks.filter((task) => task.id !== taskId),
        });
      } else {
        this.setState({ show: false });
      }
    });
  };

  // toggleChange = () => {
  //   this.state.tasks.status === !"done";
  // };

  render() {
    return (
      <div className="container mt-2">
        <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <MyToast
            show={this.state.show}
            message={"The task was deleted successfully."}
          />
        </div>
        <Card>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>{this.state.status}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
            <div>Number of tasks: {this.state.tasks.length}</div>
          </Card.Body>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Finish Date</th>
                  <th>Project name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tasks.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center">
                      <h1>There are no tasks</h1>
                    </td>
                  </tr>
                ) : (
                  this.state.tasks.map((task) => (
                    <tr
                      key={task.id}
                      className={
                        task.status === "done" ? "bg-success" : "bg-light"
                      }
                    >
                      <td>
                        {/* <input
                          type="checkbox"
                          checked={task.status === "done" ? true : false}
                          onChange={this.toggleChange}
                        /> */}
                        {task.id}
                      </td>
                      <td>{task.taskName}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>{task.startDate}</td>
                      <td>{task.finishDate}</td>
                      <td>{task.projectName}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={this.deleteTask.bind(this, task.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    );
  }
}

export default TaskList;
