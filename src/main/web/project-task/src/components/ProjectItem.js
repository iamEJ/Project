import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projetcs: [],
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
  }

  render() {
    return (
      <div className="container mt-2">
        <Card>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>{this.state.status}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
            <div>Number of tasks:{this.state.allTasks}</div>

            <Button variant="primary">Add Task</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProjectItem;
