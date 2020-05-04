import React, { Component } from "react";
import { Card, Table,Button } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowLeft, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "./MyToast";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
    };
    
  }

  componentDidMount() {
    this.getprojectInfo(); 

    this.getTasksByProjectId();
  }

  getprojectInfo = () =>{
    axios
    .get("http://localhost:8080/api/projects/" + this.props.match.params.id)
    .then((res) => {
      this.setState({
        projectTitle: res.data.projectTitle,
        description: res.data.description,
        status: res.data.status,
        allTasks: res.data.allTasks.length,
        completeTasks:res.data.completeTasks
      });
    })
    .catch((error) => {
      console.log("Error - " + error);
    });
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


  deleteTask = (taskId) => {
    axios.delete( `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/`+ taskId).then((res) => {
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
            <Card.Text>{this.state.completeTasks === this.state.allTasks ? <span style={{color:"#5cb85c"}}>done</span> : <span style={{color:"#17a2b8"}}>in_progress</span>}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
              <div>Number of tasks: {this.state.completeTasks}/{this.state.allTasks}</div>
            <p></p>
            <Link
              to={"/projects/add/" + this.props.match.params.id}
              className="btn btn-info mr-2"
            >
              <FontAwesomeIcon icon={faPlus} /> Add Task
            </Link>
            <Link to={"/projects"} className="btn btn-info mr-2">
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Link>
          </Card.Body>
          <div>
            <Table striped hover>
              <thead>
                <tr
                  className={
                    this.state.tasks.status === "done"
                      ? "bg-success"
                      : "bg-light"
                  }
                >
                  <th>#</th>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>Finish Date</th>
                  <th>Actions</th>
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

                      <td className="p-1 text-center ">
                      
                        <Link className="btn btn-info" to={"/projects/"+this.props.match.params.id+"/editTask/" + task.id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                        <Button variant="danger"
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

export default ProjectItem;
