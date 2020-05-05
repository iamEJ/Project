import React, { Component } from "react";
import { Card, Table,Button,Modal , Form} from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "./MyToast";

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
      newTaskData:{
        taskName: "",
        description: "",
        priority: "",
        status: "",
      },
      editTaskData:{
        id: "",
        taskName: "",
        description: "",
        priority: "",
        status: "",
      },
      newTaskModal:false,
      editTaskModal:false,
    };
    
  }

  componentDidMount() {
    this.getprojectInfo(); 
    this._refreshTask();
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

  editTask = (id, taskName, description, priority, status) =>{
    this.setState({
      editTaskData: {id, taskName, description, priority, status}, editTaskModal: !this.state.newTaskModal
    });
  }


  toggleNewTaskModal = () =>{

    this.setState({
      newTaskModal: !this.state.newTaskModal
    })

  }

  toggleEditTaskModal = () =>{

    this.setState({
      editTaskModal: !this.state.editTaskModal
    })

  }

  updateTask(){

    let {taskName, description, priority, status} = this.state.editTaskData;

    axios
    .put(`http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/${this.state.editTaskData.id}`,{
      taskName, description, priority, status
    }).then((res) => {
      this._refreshTask();

      this.setState({
        editTaskModal: false, editTaskData: {  
        id: "",
        taskName: "",
        description: "",
        priority: "",
        status: ""
      }})
    });
  }

  _refreshTask(){
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
  }

  addTask(){
    axios
        .post(`http://localhost:8080/api/projects/assign/${this.props.match.params.id}`, this.state.newTaskData)
        .then((res) =>{
          let {tasks} = this.state;
          tasks.push(res.data);
          this.setState({tasks, newTaskModal:false, newTaskData:{
            taskName: "",
            description: "",
            priority: "",
            status: "",
          }});
         window.location.reload(false);
        });
  }

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
          
          
            <Link to={"/projects"} className="btn btn-info mr-2">
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </Link>
            <Button variant="primary" onClick={this.toggleNewTaskModal.bind(this)}>
                Add Task
              </Button>
            <>
             

              <Modal show={this.state.newTaskModal} onHide={this.toggleNewTaskModal.bind(this)}>
                <Modal.Header closeButton>
                  <Modal.Title>Add new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
              
                <Form.Group >
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    required
                    type="text"
                    placeholder="Enter task name"
                    name="taskName"
              
                    value={this.state.newTaskData.taskName}
                    onChange={(e) =>{
                      let {newTaskData} = this.state;
                      newTaskData.taskName = e.target.value;
                      this.setState({newTaskData});
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
                   
                   value={this.state.newTaskData.description}
                   onChange={(e) =>{
                     let {newTaskData} = this.state;
                     newTaskData.description =e.target.value;
                     this.setState({newTaskData});
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
                  
                   value={this.state.newTaskData.priority}
                   onChange={(e) =>{
                     let {newTaskData} = this.state;
                     newTaskData.priority =e.target.value;
                     this.setState({newTaskData});
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
                   
                   value={this.state.newTaskData.status}
                   onChange={(e) =>{
                     let {newTaskData} = this.state;
                     newTaskData.status =e.target.value;
                     this.setState({newTaskData});
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
                  <Button variant="secondary" onClick={this.toggleNewTaskModal.bind(this)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.addTask.bind(this)}>
                    Add Task
                  </Button>
                </Modal.Footer>
              </Modal>
            </>

            
            <>  
            <Modal show={this.state.editTaskModal} onHide={this.toggleEditTaskModal.bind(this)}>
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
                    onChange={(e) =>{
                      let {editTaskData} = this.state;
                      editTaskData.taskName =e.target.value;
                      this.setState({editTaskData});
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
                   onChange={(e) =>{
                     let {editTaskData} = this.state;
                     editTaskData.description =e.target.value;
                     this.setState({editTaskData});
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
                  
                   value={this.state.editTaskData.priority}
                   onChange={(e) =>{
                     let {editTaskData} = this.state;
                     editTaskData.priority =e.target.value;
                     this.setState({editTaskData});
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
                   
                   value={this.state.editTaskData.status}
                   onChange={(e) =>{
                     let {editTaskData} = this.state;
                     editTaskData.status =e.target.value;
                     this.setState({editTaskData});
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
                  <Button variant="secondary" onClick={this.toggleEditTaskModal.bind(this)}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={this.updateTask.bind(this)}>
                    Update Task
                  </Button>
                </Modal.Footer>
              </Modal>
            </>      

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
                      
                        <Button variant="info"
                          onClick={this.editTask.bind(this,task.id, task.taskName, task.description, task.priority, task.status)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
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
