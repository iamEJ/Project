import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      search:null,

    };
  }

  componentDidMount() {
    this.findAllTasks();
  }

  findAllTasks = () => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then(res => 
        { this.setState({ tasks: res.data }); })
  };

  
  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
  };

  render() {

    const csvData = this.state.tasks;
    
    const data = this.state.tasks;
    const columns = [
      {
        name: '#',
        width:"60px",
        selector:'id',
        sortable: true,
        cell: row => <div>{row.id}</div>,
      },
      {
        name: 'TaskName',
        width:"140px",
        selector:'taskName',
        sortable: true,
        cell: row => <div>{row.taskName}</div>,
      },
      {
        name: 'Description',
        selector: 'description',
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
        name: 'Project Name',
        selector: 'projectName',
        sortable: true,
        cell: row =><div>{row.projectName}</div>,
      },
    ];

    const conditionalRowStyles = [
      {
        when: row => row.status === 'done',
        style: {
          backgroundColor: '	rgb(38, 153, 0,0.2)',
          color: '#004d00',
        },
      },
    ];

    return (
      <div className="container mt-2">
        <div
          className={{ position: "sticky-top" }}
          style={{ display: this.state.show ? "block" : "none" }}
        >
        </div>
        <Card style={{boxShadow: "0px 0px 10px  rgba(12,13,0,0.3)"}}>
          <Card.Body>
            <Card.Title>{this.state.projectTitle}</Card.Title>
            <Card.Text>{this.state.status}</Card.Text>
            <Card.Text>{this.state.description}</Card.Text>
         

            
            <div className="container-fluid d-flex justify-content-left "> 
                         
                    <input type="text" 
                    className="form-control border border-dark mainLoginInput" 
                    placeholder="&#61442; Search"  
                    style={{width:"300px"}} 
                    onChange={(e)=>this.searchSpace(e)} 
                    />
            <h5 className="container-fluid d-flex justify-content-right mt-2 ">
               <span className="badge badge-dark m-0 ">Number of tasks: {this.state.tasks.length}</span>
            </h5>    
            <CSVLink 
                data={csvData} 
                style={{width:"120px"}} 
                className="btn btn-warning" 
                filename={"tasksList.csv"}
                title={"Download Tasks CSV"}
                >Task CSV
            </CSVLink>
              </div>
           
             
          </Card.Body>

          <div>                          
              <DataTable
                title="The list of Tasks"
                columns={columns}
                data={data.filter((e)=>{
                  if(this.state.search == null)
                      return e
                  else if((e.taskName.toLowerCase().includes(this.state.search.toLowerCase()) || (e.status.toLowerCase().includes(this.state.search.toLowerCase())))){
                      return e
                  }
                })}
                highlightOnHover
                pagination
                conditionalRowStyles={conditionalRowStyles}
             />
          </div>
        </Card>
      </div>
    );
  }
}

export default TaskList;
