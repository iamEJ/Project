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
      .get("http://localhost:8080/api/projects/1")
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div className="container mt-2">
        <Card>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ProjectItem;
