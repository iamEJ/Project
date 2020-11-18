import React, { useState } from "react";
import "./ProjectList.css";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import Projectt from "../project/ProjectNew";
import { useEffect } from "react";
import axios from "axios";

function ProjectListNew() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects").then((result) => {
      setProjects(result.data);
    });
  });

  return (
    <div className="projectList">
      <div className="projectList__header">
        <div className="projectList__search">
          <h3>
            The number of projects: <span>{projects.length}</span>
          </h3>
          <input
            placeholder="&#61442; Search for Project"
            className="mainLoginInput"
          />
        </div>
        <div>
          <Link className="projectList__button" to="/addproject">
            Create Project
          </Link>
          <CSVLink
            data={projects}
            className="projectList__buttonsCSVLink"
            filename={"projectsList.csv"}
            title={"Download Projects CSV"}
          >
            Project CSV
          </CSVLink>
        </div>
      </div>
      {projects.map((project) => (
        <Projectt
          key={project.id}
          projectTitle={project.projectTitle}
          description={project.description}
          status={project.status}
          completeTasks={project.completeTasks}
          allTasks={project.allTasks}
        />
      ))}
    </div>
  );
}

export default ProjectListNew;
