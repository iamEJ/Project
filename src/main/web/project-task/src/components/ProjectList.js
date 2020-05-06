import React, { Component } from "react";
import { Card, Button  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencilAlt,
  faEnvelopeSquare,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import cx from "classnames";
import { Link } from "react-router-dom";
import "../App.css";


class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      search:null
    };
  }



  componentDidMount() {
    this.findAllProjects();
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  }

  findAllProjects = () => {
    axios.get('http://localhost:8080/api/projects')
    .then(res => 
      { this.setState({ projects: res.data }); })
  };

  deleteProject = (projectId) => {
    axios
      .delete("http://localhost:8080/api/projects/" + projectId)
      .then((res) => {
        if (res.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);

          this.setState({
            projects: this.state.projects.filter(
              (project) => project.id !== projectId
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };


  render() {

    return (
      <div className="container">
        <div className="mt-4  mb-2 d-flex justify-content-center text-center " style={{fontFamily:"Lucida Sans Unicode, Lucida Grande, sans-serif"}}>
          <h2>
            The number of projects:{" "}
            <span className="badge badge-dark">
              {this.state.projects.length}
            </span>
          </h2>
        </div>
        <div style={{width:"160px", margin: "0 auto", marginBottom:"20px"}}>
            <Link to={"/projectForm"} className={"nav-link text-white btn btn-dark"}>
               Create Project
            </Link>
          
        </div>
  
              <div className="container-fluid d-flex justify-content-center mb-4">            
                    <input type="text" 
                    className="form-control border border-dark mainLoginInput" 
                    placeholder="&#61442; Search"  
                    style={{width:"260px"}} 
                    onChange={(e)=>this.searchSpace(e)} 
                    />
              </div>
         
        <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
          <MyToast
            show={this.state.show}
            message={"The project was deleted successfully."}
          />
        </div>
      
          {this.state.projects.length === 0 ? (
            <h1>There are no projects</h1>
          ) : (
            this.state.projects.filter((data)=>{
              if(this.state.search == null)
                  return data
              else if(data.projectTitle.toLowerCase().includes(this.state.search.toLowerCase())){
                  return data
              }
            }).map((project) => (
            
                <Card key={project.id}
                
                  style={{  width:"100%" , marginBottom:"14px",boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}
                >
            
                    <div >
                          <Link
                          style={{ color: "#000", fontSize:"20px", marginLeft:"10px"}}
                          to={"projects/" + project.id}
                          className="titleHover"
                        >
                          {project.projectTitle}{" "}

                        </Link>
                        <div style={{float:"right",width:"140px"}}> 
                                <Link
                                to={"edit/" + project.id}
                                className="btn btn-secondary mr-1 mt-2 "
                                title="Edit"
                                style={{fontSize:"12px", width:"36px"}}
                              >
                                <FontAwesomeIcon icon={faPencilAlt} />
                              </Link>
                              <Button
                                variant="danger"
                                className="btn btn-info mt-2"
                                style={{fontSize:"12px"}}
                                title="Delete"
                                onClick={this.deleteProject.bind(this, project.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>{" "}
                              <Link
                                to={"projects/" + project.id}
                                className="btn btn-info mr-1 mt-2"
                                title="View"
                                style={{fontSize:"12px"}}
                              >
                                <FontAwesomeIcon icon={faEnvelopeSquare} />
                              </Link>
                         </div>
                   
                      <p style={{fontSize:"12px",marginLeft:"10px"}} className={cx("text-lowercase", "font-weight-bold", {
                        
                        "text-success ": project.status === "done",
                        "text-info ": project.status === "in_progress",
                      })}>
                         {project.completeTasks === project.allTasks.length ? <span style={{color:"#5cb85c"}}>done</span> : <span style={{color:"#17a2b8"}}>in_progress</span>}{" "}
                      
                      <span className="badge badge-dark">
                      {project.completeTasks}/{project.allTasks.length}
                      </span>
                   </p>
                    </div>
                    
                    <p style={{color:"#878787",marginLeft:"10px"}}>{project.description}</p>
                  
                
                 
        
                </Card>
           
            ))
          )}
        
      </div>
    );
  }

}
export default ProjectList;
