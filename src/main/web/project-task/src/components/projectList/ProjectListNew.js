import React, { useState, useContext } from "react";
import "./ProjectListNew.css";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import ProjectNew from "../project/ProjectNew";
import Fuse from "fuse.js";
import { DataContext } from "../../contex/ContextProvider";

function ProjectListNew() {
  const [searchTerm, setSearchTerm] = useState("");
  const { projects } = useContext(DataContext);

  const fuse = new Fuse(projects, {
    keys: ["description", "projectTitle"],
  });
  const results = fuse.search(searchTerm);
  const projectResults = searchTerm
    ? results.map((result) => result.item)
    : projects;

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
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
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
      {projectResults.map((project) => (
        <ProjectNew key={project.id} {...project} />
      ))}
    </div>
  );
}

export default ProjectListNew;
