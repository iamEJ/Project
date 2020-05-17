import React, { Component } from 'react';
import { Card, Button,Modal , Form, Accordion} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPencilAlt,faSortDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from 'react-router-dom';
import cx from "classnames";

export default class TaskBord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
      editTaskData:{
        id: "",
        taskName: "",
        description: "",
        priority: "",
        status: "",
      },
      editTaskModal:false,
      
    };
  
  }

  editTask = (id, taskName, description, priority, status) =>{
    this.setState({
      editTaskData: {id, taskName, description, priority, status}, editTaskModal: !this.state.newTaskModal
    });
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


  componentDidMount() {
 
    this._refreshTask();
  }

  _refreshTask(){
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
              
                <Card>
                  <Card.Header className="text-left ">
                  <Link to={`/projects/${this.props.match.params.id}`} className="btn btn-info"> 
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                  </Link>
                    
                  </Card.Header>
                 
                 
                    <Card.Body>
                    <div className="container">
                  <h1 className="text-center mb-0 font-weight-light">Task Board</h1>
                <br />
                <hr />
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="card text-center mb-2">
                        <div className="btn bg-secondary text-white" style={{cursor:"default"}}>
                          <h4 className=" font-weight-light">To Do</h4>
                        </div>
                      </div>                 
                            {this.state.tasks.map((task) => {
                              if(task.status === "todo"){
                                return(
                                  <Card key={task.id}
                                style={{  width:"100%" , marginBottom:"14px",boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}>
                                  
                                 <Accordion defaultActiveKey="0">
                                      <Card style={{borderRadius:"0"}}>
                                    
                                        <Card.Header className="p-0 d-flex justify-content-between " >
                                       
                                          <Accordion.Toggle as={Button} variant="link" eventKey="1" className="text-secondary text-capitalize ">
                                            {task.taskName}{" "} <FontAwesomeIcon icon={faSortDown} />
                                          </Accordion.Toggle>
                                          <div className="btn bg-info " style={{width:"50px",borderRadius:"0", height:"50px", color:"#fff"}} title="Edit"
                                             onClick={this.editTask.bind(this,task.id, task.taskName, task.description, task.priority, task.status)}
                                               > 
                                            <FontAwesomeIcon icon={faPencilAlt}  style={{marginTop:"10px"}}/>

                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                          <Card.Body>
                                          <p style={{fontSize:"12px"}} >
                                          <span className="font-weight-bold">Priority: </span>
                                          <span className={cx("text-lowercase", "font-weight-bold", {
                                                      "text-success ": task.priority === "low",
                                                      "text-warning ": task.priority === "medium",
                                                      "text-danger ": task.priority === "hight",
                                          })}>{task.priority}</span>
                                          </p>
                                            <p style={{fontSize:"12px"}}>
                                              <span className="font-weight-bold">Start: </span>{task.startDate}{" "}
                                             
                                                <span className="font-weight-bold"> End: </span>{task.finishDate}
                                            
                                              
                                            </p>
                                             <p><span className="font-weight-bold">Description: </span>{task.description}</p>
                                            
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </Card>
                                    </Accordion>
                                  
                                </Card>
                                )                        
                              }
                            })}
                             
                    </div>
                    <div className="col-md-4">
                      <div className="card text-center mb-2">
                        <div className="btn bg-info text-white" style={{cursor:"default"}} >
                          <h4 className=" font-weight-light">In Progress</h4>
                        </div>
                      </div>                 
                           {this.state.tasks.map((task) => {
                                if(task.status === "in_progress"){
                                  return(
                                    <Card key={task.id}
                                  style={{  width:"100%" , marginBottom:"14px",boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}>
                                    
                                    <Accordion defaultActiveKey="0">
                                      <Card style={{borderRadius:"0"}}>
                                    
                                        <Card.Header className="p-0 d-flex justify-content-between" >
                                   
                                          <Accordion.Toggle as={Button} variant="link" eventKey="1" className="text-secondary text-capitalize">
                                            {task.taskName}{" "} <FontAwesomeIcon icon={faSortDown} />
                                          </Accordion.Toggle>
                                          <div className="btn bg-info" style={{width:"50px",borderRadius:"0", height:"50px", color:"#fff"}} title="Edit"
                                             onClick={this.editTask.bind(this,task.id, task.taskName, task.description, task.priority, task.status)}
                                        > 
                                            <FontAwesomeIcon icon={faPencilAlt}  style={{marginTop:"10px"}}/>

                                        </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                          <Card.Body>
                                          <p style={{fontSize:"12px"}} >
                                          <span className="font-weight-bold">Priority: </span>
                                          <span className={cx("text-lowercase", "font-weight-bold", {
                                                      "text-success ": task.priority === "low",
                                                      "text-warning ": task.priority === "medium",
                                                      "text-danger ": task.priority === "hight",
                                          })}>{task.priority}</span>
                                          </p>
                                            <p style={{fontSize:"12px"}}>
                                              <span className="font-weight-bold">Start: </span>{task.startDate}{" "}
                                             
                                                <span className="font-weight-bold"> End: </span>{task.finishDate}
                                            
                                              
                                            </p>
                                             <p><span className="font-weight-bold">Description: </span>{task.description}</p>
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </Card>
                                    </Accordion>
                                
                                  </Card>
                                  )                        
                                }
                            })}
                    </div>
                    <div className="col-md-4">
                      <div className="card text-center mb-2">
                        <div className="btn bg-success text-white font-weight-light" style={{cursor:"default"}}>
                          <h4 className=" font-weight-light">Done</h4>
                        </div>
                      </div>
                            {this.state.tasks.map((task) => {
                                    if(task.status === "done"){
                                      return(
                                        <Card key={task.id}
                                      style={{  width:"100%" , marginBottom:"14px",boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}>
                              <Accordion defaultActiveKey="0">
                                      <Card style={{borderRadius:"0"}}>
                                    
                                        <Card.Header className="p-0 d-flex justify-content-between" >
                                       
                                          <Accordion.Toggle as={Button} variant="link" eventKey="1" className="text-secondary text-capitalize">
                                            {task.taskName}{" "} <FontAwesomeIcon icon={faSortDown} />
                                          </Accordion.Toggle>
                                          <div className="btn bg-info" style={{width:"50px",borderRadius:"0", height:"50px", color:"#fff"}} title="Edit"
                                             onClick={this.editTask.bind(this,task.id, task.taskName, task.description, task.priority, task.status)}
                                        > 
                                            <FontAwesomeIcon icon={faPencilAlt}  style={{marginTop:"10px"}}/>

                                        </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                          <Card.Body>
                                          <p style={{fontSize:"12px"}} >
                                          <span className="font-weight-bold">Priority: </span>
                                          <span className={cx("text-lowercase", "font-weight-bold", {
                                                      "text-success ": task.priority === "low",
                                                      "text-warning ": task.priority === "medium",
                                                      "text-danger ": task.priority === "hight",
                                          })}>{task.priority}</span>
                                          </p>
                                            <p style={{fontSize:"12px"}}>
                                              <span className="font-weight-bold">Start: </span>{task.startDate}{" "}
                                             
                                                <span className="font-weight-bold"> End: </span>{task.finishDate}
                                            
                                              
                                            </p>
                                             <p><span className="font-weight-bold">Description: </span>{task.description}</p>
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </Card>
                                    </Accordion>
                                      
                                      </Card>
                                      )                        
                                    }
                            })}
                    </div>
                  </div>
                </div>
                    </div>
                    </Card.Body>
                  
                </Card>

             
            </div>
        )
    }
}
