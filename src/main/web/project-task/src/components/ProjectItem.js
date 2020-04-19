import React, { Component } from "react";
import { Card, Button, Table } from "react-bootstrap";
import axios from "axios";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/projects/" + this.props.match.params.id)
      .then((res) => {
        this.setState({
          projectTitle: res.data.projectTitle,
          description: res.data.description,
          status: res.data.status,
          allTasks: res.data.allTasks.length,
        });
      })
      .catch((error) => {
        console.log("Error - " + error);
      });

    this.getTasksByProjectId();
  }

  getTasksByProjectId = () => {
    axios
      .get(
        `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks`
      )
      .then((res) => res.data)
      .then((data) => {
        this.setState({ tasks: data });
      })
      .catch((error) => {
        console.log("Error - " + error);
      });
  };

  render() {
    return (
      <div className="container mt-2">
        <Card>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>{this.state.status}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
            <div>Number of tasks: {this.state.allTasks}</div>
            <p></p>
            <Button variant="primary">Add Task</Button>
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
                </tr>
              </thead>
              <tbody>
                {this.state.tasks.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      <h1>There are no tasks</h1>
                    </td>
                  </tr>
                ) : (
                  this.state.tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.taskName}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>{task.startDate}</td>
                      <td>{task.finishDate}</td>
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

export default ProjectItem;
