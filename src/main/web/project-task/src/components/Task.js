import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faSave, faUndo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";

class Task extends Component {


  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.taskChange = this.taskChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
  
  }

  initialState = {
    id: "",
    taskName: "",
    description: "",
    priority: "",
    status: "",
 
  };

    // componentDidMount(){
    //   const taskId = this.props.match.params.id;

    //   if(taskId){
    //   this.findATaskById(taskId);
    //   }
    // }

    

    // findATaskById = (taskId) =>{
     
    //   axios.get(`http://localhost:8080/api/projects/${this.props.id}/tasks/${taskId}`)
    //   .then(res =>{
    //       if(res.data != null){
            
    //         this.setState({
    //           id: res.data.id,
    //           taskName: res.data.taskName,
    //           description: res.data.description,
    //           priority: res.data.priority,
    //           status: res.data.status,

    //         })
    //       }
    //   }).catch((error) => {
    //     console.error("The error - " + error);
    //   })
    // }

    // updateTask = (e) => {
    //   e.preventDefault();
  
    //   const task = {
    //     id: this.state.id,
    //           taskName: this.state.taskName,
    //           description: this.state.description,
    //           priority: this.state.priority,
    //           status: this.state.status,
       
    //   };
  
    //   axios
    //     .put(`http://localhost:8080/api/projects/${this.props.id}/tasks/${this.state.id}`, task)
    //     .then((res) => {
    //       if (res.data != null) {
    //         this.setState({ show: true, method: "put" });
    //         setTimeout(() => this.setState({ show: false }), 3000);
            
    //       } else {
    //         this.setState({ show: false });
    //       }
    //     });
    //   this.setState(this.initialState);
    // };

  submitTask = (e) => {
    e.preventDefault();

    const task = {
      taskName: this.state.taskName,
      description: this.state.description,
      priority: this.state.priority,
      status: this.state.status,
    };
  
    axios
      .post(`http://localhost:8080/api/projects/${this.props.id}`, task)
      .then((res) => {
        
        if (res.data != null) {
          console.log(this.props, "test");
          this.setState({ show: true, method: "post" });
          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      });
      this.setState(this.initialState);
      
  };
  

  taskChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  resetTask = () => {
    this.setState(() => this.initialState);
  };



  render() {
    const { taskName, description, priority, status } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "The task was updated successfully."
                : "The task was added successfully."
            }
          />
        </div>
        <Card style={{ width: "60%", margin: "0 auto", marginTop: "10px" }}>
          <Form
            onReset={this.resetTask}
            onSubmit={this.state.id ? this.updateTask : this.submitTask}
            id="taskFormId"
          >
            <div>
              <Card.Header>
                <h1 className={"text-center m-0"}>
                  {" "}
                  <FontAwesomeIcon icon={faTasks} />{this.state.id ? "Update Task" : " Add Task"}
                </h1>
              </Card.Header>
            </div>
            <Card.Body>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  autoComplete="off"
                  required
                  type="text"
                  placeholder="Enter task name"
                  name="taskName"
                  value={taskName}
                  onChange={this.taskChange}
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
                  value={description}
                  onChange={this.taskChange}
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
                  value={priority}
                  onChange={this.taskChange}
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
                  value={status}
                  onChange={this.taskChange}
                >
                  <option></option>
                  <option>todo</option>
                  <option>in_progress</option>
                  <option>done</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button variant="primary" type="reset">
                <FontAwesomeIcon icon={faUndo} />
                Res
              </Button>{" "}
              {/* <Button variant="primary" type="reset" onClick={this.projectItem.bind()}>
                <FontAwesomeIcon icon={faUndo} />
               Back
              </Button>{" "} */}
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Task;
