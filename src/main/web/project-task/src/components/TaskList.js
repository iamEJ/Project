import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import MyToast from "./MyToast";
import axios from "axios";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      search:null,

    };

    this.compareBy.bind(this);
    this.sortBy.bind(this);
    

  }

  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    
    let arrayCopy = [...this.state.tasks];
    arrayCopy.sort(this.compareBy(key));
    this.setState({tasks: arrayCopy});
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

  
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
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
        <Card style={{boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>{this.state.status}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
         

            <h2 className="text-center">Number of tasks: <span className="badge badge-dark">{this.state.tasks.length}</span></h2>  
            <div className="container-fluid d-flex justify-content-center mb-4">                      
                    <input type="text" 
                    className="form-control border border-dark mainLoginInput" 
                    placeholder="&#61442; Search"  
                    style={{width:"260px"}} 
                    onChange={(e)=>this.searchSpace(e)} 
                    />
              </div>

          </Card.Body>
          <div>
            <Table striped  hover>
              <thead>
                <tr>
                  <th onClick={() => this.sortBy('id')} style={{cursor:"pointer"}}>#</th>
                  <th onClick={() => this.sortBy('taskName')} style={{cursor:"pointer"}}>Task Name</th>
                  <th onClick={() => this.sortBy('description')} style={{cursor:"pointer"}}>Description</th>
                  <th onClick={() => this.sortBy('priority')} style={{cursor:"pointer"}}>Priority</th>
                  <th onClick={() => this.sortBy('status')} style={{cursor:"pointer"}}>Status</th>
                  <th onClick={() => this.sortBy('startDate')} style={{cursor:"pointer"}}>Start Date</th>
                  <th onClick={() => this.sortBy('finishDate')} style={{cursor:"pointer"}}>Finish Date</th>
                  <th onClick={() => this.sortBy('projectName')} style={{cursor:"pointer"}}>Project name</th>
                 
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
                  this.state.tasks.filter((data)=>{
                    if(this.state.search == null)
                        return data
                    else if(data.taskName.toLowerCase().includes(this.state.search.toLowerCase()) || data.status.toLowerCase().includes(this.state.search.toLowerCase())){
                        return data
                    }
                  }).map((task) => (
                    <tr
                      key={task.id}                    
                      style={{background: task.status === "done" ? "#5cb85c " : "#fff"}}
                    >
                      <td>
                     
                        {task.id}
                      </td>
                      <td>{task.taskName}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{task.status}</td>
                      <td>{task.startDate}</td>
                      <td>{task.finishDate}</td>
                      <td>{task.projectName}</td>

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
