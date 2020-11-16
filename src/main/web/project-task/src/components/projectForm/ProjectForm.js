import React, { useState } from "react";
import "./ProjectForm.css";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import ReplayIcon from "@material-ui/icons/Replay";
import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import CostumSnackbar from "../snackbar/CostumSnackbar";

function ProjectForm() {
  const initialState = {
    projectTitle: "",
    description: "",
  };

  const [project, setProject] = useState(initialState);
  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/projects", project)
      .then((response) => {
        setProject({
          projectTitle: response.data.projectTitle,
          description: response.data.description,
        });
        setOpen(true);
      })
      .catch((error) => {
        console.log("Error - " + error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setProject(initialState);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <CostumSnackbar
        message="The project is added successfuly."
        handleClose={handleClose}
        open={open}
      />
      <div className="projectForm">
        <div className="projectForm__container">
          <h1>Add Project</h1>
          <form>
            <h5>Project Name</h5>
            <input
              type="text"
              placeholder="Enter project name"
              value={project.projectTitle || ""}
              onChange={handleInputChange}
              name="projectTitle"
            />
            <h5>Description</h5>
            <textarea
              type="text"
              placeholder="Enter the description for your project"
              value={project.description || ""}
              onChange={handleInputChange}
              name="description"
            />
            <div className="projectForm__buttons">
              <button
                className="projectForm__addButton"
                type="submit"
                onClick={handleSubmit}
              >
                <AddIcon /> Add
              </button>
              <button
                className="projectForm__resetButton"
                type="submit"
                onClick={reset}
              >
                <ReplayIcon />
                Reset
              </button>
              <Link to="/projects">
                <ListIcon />
                Projects
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectForm;
