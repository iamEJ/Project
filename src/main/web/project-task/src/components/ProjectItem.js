import React, { Component } from "react";
import { Card, Button,Modal , Form,Row,Container,Col } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "./MyToast";
import DataTable,{ createTheme } from 'react-data-table-component';


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
      deleteTaskModal:false,
      search:"",
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


  ////////////////Toggle New/Edi/Delete Task//////////////////////

  toggleNewTaskModal = () =>{
    this.setState({
      newTaskModal: !this.state.newTaskModal
    })
  };

  toggleEditTaskModal = () =>{
    this.setState({
      editTaskModal: !this.state.editTaskModal
    })
  };

  toggleDeleteTaskModal = (rowId) =>{
    this.setState({
      deleteTaskModal: !this.state.deleteTaskModal,
      tmpId: rowId,
    })
  };

  ////////////////UPDATE TASK//////////////////////

  updateTask(){

    let {taskName, description, priority, status} = this.state.editTaskData;

    axios
    .put(`http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/${this.state.editTaskData.id}`,{
      taskName, description, priority, status
    }).then((res) => {
      
      if (res.data != null) {
        this.setState({ show: true, method: "put" });
          setTimeout(() => this.setState({ show: false }), 3000);
      }else {
        this.setState({ show: false });
      }
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
        console.log(data);
        this.setState({ tasks: data });
      })
      .catch((error) => {
        console.log("Error - " + error);
      });
  }


  ////////////////ADD TASK//////////////////////

  addTask(){
   
    axios
        .post(`http://localhost:8080/api/projects/assign/${this.props.match.params.id}`, this.state.newTaskData)
        .then((res) =>{
          if (res.data != null) {
            this.setState({ show: true, method: "post" });
            setTimeout(() => this.setState({ show: false }), 3000);
          } else {
            this.setState({ show: false });
          }
          let {tasks} = this.state;
          tasks.push(res.data);
          
          this.setState({tasks, newTaskModal:false, newTaskData:{
            taskName: "",
            description: "",
            priority: "",
            status: "",
          }});
          this._refreshTask();
       //  window.location.reload(false);
        });


  }

    ////////////////DELETE TASK//////////////////////


    deleteTask = (taskId) => {

      
        axios.delete( `http://localhost:8080/api/projects/${this.props.match.params.id}/tasks/${this.state.tmpId}`).then( res => {
  console.log(res)
 
            this.setState({
              deleteTaskModal:false,
              tasks: this.state.tasks.filter((task) => task.id !== taskId),
            });
          

          this._refreshTask();
        })

        
     

    };
  
    editTask = (id, taskName, description, priority, status) =>{
      this.setState({
        editTaskData: {id, taskName, description, priority, status}, editTaskModal: !this.state.newTaskModal
      });
    }
  

  ////////////////SEARCH TASK//////////////////////

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})

  };

  render() {

    const data = this.state.tasks.filter((e)=>{
      try {      
      if(this.state.search === "")
          return e
      else if((e.taskName.toLowerCase().includes(this.state.search.toLowerCase()) || (e.status.toLowerCase().includes(this.state.search.toLowerCase())))){
          return e
      }}catch (error) {
        console.log("Error - " + error);
      }

    });
    let number = 1;
    const columns = [
      {
        name: '#',
        width:"60px",
        selector:'id',
        sortable: true,
        
        cell: row => <div>{number++}</div>,
      },
      {
        name: 'TaskName',
        width:"160px",
        selector:'taskName',
        sortable: true,
        
        cell: row => <div>{row.taskName}</div>,
      },
      {
        name: 'Description',
        selector: 'description',
        width:"385px",
        sortable: true,
        cell: row =><div>{row.description}</div>,
      },
      {
        name: 'Priority',
        width:"120px",
        selector:'priority',
        sortable: true,
        cell: row => <div>{row.priority}</div>,
      },
      {
        name: 'Status',
        width:"120px",
        selector: 'status',
        sortable: true,
        cell: row =><div>{row.status}</div>,
      },
      {
        name: 'Start Date',
        selector:'startDate',
        width:"130px",
        sortable: true,
        cell: row => <div>{row.startDate}</div>,
      },
      {
        name: 'Finish Date',
        selector: 'finishDate',
        width:"130px",
        sortable: true,
        cell: row =><div>{row.finishDate}</div>,
      },
      {
        name: 'Edit / Delete',
        width:"120px",
        cell: row =><div>
        <Button className="iconHover"  title="Edit"
          onClick={this.editTask.bind(this,row.id, row.taskName, row.description, row.priority, row.status)}
        >
        <FontAwesomeIcon icon={faPencilAlt} />
      </Button>{" "}
      <Button className="iconHover" title="Delete"
          //onClick={this.deleteTask.bind(this, row.id)}
        //  onClick={() => { if (window.confirm('Are you sure you wish to delete this task?')) {this.deleteTask( row.id)} } }
       onClick={this.toggleDeleteTaskModal.bind(this, row.id)}
     
      >
   
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      </div>,
      },
    ];

    const conditionalRowStyles = [
      {
        when: row => row.status === 'done',
        style: {
          backgroundColor: '#fef8f5',
          color: '#eb5d1e',
        },
      },
    ];

    createTheme('solarized', {
      text: {
        primary: '#4e4039',
        secondary: '#4e4039',
      },
      context: {
        background: '#4e4039',
        text: '#FFFFFF',
      },
      divider: {
        default: '#4e4039',
      },
      action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
      },
    });

    



    return (
      <div className="container-fluid mt-2" style={{width:"75%"}}>
         <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
      
          <div>


          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "The task was updated successfully."
                : "The task was added successfully."
            }
          />
        </div>
        </div>
        <Card style={{boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)",marginTop:"100px"}}>
          <Card.Body>
            <Container>
              <Row>
                <Col style={{borderLeft:"2px solid #eb5d1e"}}>
                  <Card.Title><h1 style={{color:"#4e4039"}}>{this.state.projectTitle}</h1></Card.Title>
                  <Card.Text className="text-uppercase">{this.state.completeTasks === this.state.tasks.length ? <span style={{color:"#eb5d1e"}}>done</span> : <span style={{color:"#4e4039"}}>in_progress</span>}</Card.Text>
                   <Card.Text>{this.state.description}</Card.Text>
                   <Link style={{background:"#4e4039",border:"1px solid #4e4039"}} to={"/projects"} className="btn text-white mr-2">
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                  </Link>
                  <Button style={{background:"#eb5d1e",border:"1px solid #eb5d1e"}} className="mr-2" onClick={this.toggleNewTaskModal.bind(this)}>
                      Add Task
                    </Button>
                    <Link style={{background:"#4e4039",border:"1px solid #4e4039"}} to={`/projects/${this.props.match.params.id}/taskbord`} className="btn mr-2 text-white">
                    Task Board
                  </Link>
                </Col>
                <Col>
                <div className="container-fluid d-flex justify-content-end p-0 mb-2"> 

                              <input type="text" 
                              className="form-control border border-dark mainLoginInput" 
                              placeholder="&#61442; Search for Task"  
                              style={{width:"300px"}} 
                              onChange={(e)=>this.searchSpace(e)} 
                              />
                   </div>
                   <div>                                                    
                            <h5 className="container-fluid d-flex justify-content-end mt-2 ">
                                <span className="badge m-0 text-white" style={{background:"#eb5d1e"}}>Number of tasks: {this.state.completeTasks}/{this.state.tasks.length}</span>
                            </h5>    
                         </div>
                </Col>
              </Row>
            </Container>
           
             
           
          
          


            <>
             

              <Modal show={this.state.newTaskModal} onHide={this.toggleNewTaskModal.bind(this)} style={{borderRadius:"none",color:"#4e4039"}}>
                <Modal.Header closeButton style={{background:"#fef8f5"}}>
                  <Modal.Title>Add new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form >
              
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
                    className="form-control"
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
                    className="form-control"
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
                  
                  </Form.Control>
                </Form.Group>
            

            </Form>

                </Modal.Body>
                <Modal.Footer style={{background:"#fef8f5"}}>
                <Button style={{background:"#eb5d1e",border:"1px solid #eb5d1e"}} onClick={this.addTask.bind(this)}>
                    Add Task
                  </Button>
                  <Button style={{background:"#4e4039",border:"1px solid #4e4039"}} onClick={this.toggleNewTaskModal.bind(this)}>
                    Close
                  </Button>                  
                </Modal.Footer>
              </Modal>
            </>

            
            <>  
            <Modal show={this.state.editTaskModal} onHide={this.toggleEditTaskModal.bind(this)}  style={{borderRadius:"none",color:"#4e4039"}}>
                <Modal.Header closeButton style={{background:"#fef8f5"}}>
                  <Modal.Title>Edit new Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>

                <Form.Group controlId="formTaskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"                
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
                    className="form-control"
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
                    className="form-control"
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
                <Modal.Footer style={{background:"#fef8f5"}}>
                  
                  <Button style={{background:"#eb5d1e",border:"1px solid #eb5d1e"}} onClick={this.updateTask.bind(this)}>
                    Update Task
                  </Button>
                  <Button style={{background:"#4e4039",border:"1px solid #4e4039"}} onClick={this.toggleEditTaskModal.bind(this)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>      

          </Card.Body>
          <div>
            <DataTable
                title="The list of Tasks"
                columns={columns}
                data={data}
                highlightOnHover
                 defaultSortField="id"
                defaultSortAsc={false}
                theme="solarized"
                pagination
                allowOverflow
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5,10, 15, 20, 25, 30]}
                conditionalRowStyles={conditionalRowStyles}
             />
          </div> 

          {/* ///////////////DELETE MODAL /////////////// */}

          <Modal show={this.state.deleteTaskModal} onHide={this.toggleDeleteTaskModal.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title style={{color:"#4e4039"}}>Deleting Task</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p style={{color:"#4e4039"}}>Do you want to delete task?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button style={{background:"#eb5d1e",border:"1px solid #eb5d1e"}} onClick={this.deleteTask.bind(this)}>Delete</Button>
                <Button style={{background:"#4e4039",border:"1px solid #4e4039"}} onClick={this.toggleDeleteTaskModal.bind(this)}>Close</Button>              
              </Modal.Footer>
          </Modal>     
        </Card>
      </div>
    );  
  }

  
}

export default ProjectItem;
