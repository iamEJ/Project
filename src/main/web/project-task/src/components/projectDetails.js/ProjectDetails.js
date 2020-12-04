import React, { useEffect, useState } from "react";
import "./ProjectDetails.css";
import { useParams } from "react-router";
import Axios from "axios";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TaskList from "../taskList/TaskList";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects/${id}`).then((result) => {
      setProject(result.data);
    });
  }, [id]);

  return (
    <div className="projectDetails">
      <div className="projectDetails__container">
        <div className="projectDetails__header">
          <div className="projectDetails__headerText">
            <h1>{project.projectTitle}</h1>
            <h3>
              {project.completeTasks === project.allTasks
                ? project.status === "done"
                : project.status === "in_progress"}
              {project.status}
            </h3>
            <p>{project.description}</p>
            <div className="projectDetails__buttons">
              <Link to="/projectss">
                <ChevronLeftIcon />
                Back
              </Link>
              <button>Add Task</button>
              <Link to="">Task Board</Link>
            </div>
          </div>
          <div className="projectDetails__search">
            <input
              placeholder="&#61442; Search for task"
              className="mainLoginInput"
              type="text"
            />
            <p>
              Number of tasks: {project.completeTasks}/{project.allTasks}
            </p>
          </div>
        </div>
        <TaskList id={project.id} />
      </div>
    </div>
  );
}

export default ProjectDetails;
