import React, { Component } from 'react';
import { Card, Table,Button,Modal , Form, Accordion} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash, faEdit,faSortDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from 'react-router-dom';

export default class TaskBord extends Component {

  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: []
    };
  
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
              
                <Card>
                  <Card.Header className="text-left">
                  <Link to={`/projects/${this.props.match.params.id}`} className="btn btn-info"> 
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                  </Link>
                    
                  </Card.Header>
                 
                 
                    <Card.Body>
                    <div className="container">
                  <h1 className="text-center mb-0">Task Board</h1>
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
                                  
                                <p style={{color:"#878787", fontSize:"16px"}} className="text-left pt-2 pl-2 text-capitalize">{task.id}.{" "}{task.taskName}</p>
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
                                    
                                  <p style={{fontSize:"16px"}} className="text-left pt-2 pl-2 text-info text-capitalize">{task.id}.{" "}{task.taskName}</p>
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
                                        
                                      <p style={{fontSize:"16px"}} className="text-left pt-2 pl-2 text-capitalize text-success">{task.id}.{" "}{task.taskName}</p>
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
