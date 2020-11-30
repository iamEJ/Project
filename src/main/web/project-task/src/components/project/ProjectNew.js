import React from "react";
import "./ProjectNew.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreIcon from "@material-ui/icons/More";
import { Link } from "react-router-dom";

function ProjectNew({
  projectTitle,
  description,
  status,
  completeTasks,
  allTasks,
}) {
  return (
    <div className="project">
      <div className="project__text">
        <Link to="/">{projectTitle}</Link>
        {status === "done" ? (
          <h6 className="project__statusDone">
            {status}
            <span>
              {completeTasks}/{allTasks}
            </span>
          </h6>
        ) : (
          <h6 className="project__statusInProgress">
            {status}
            <span>
              {completeTasks}/{allTasks}
            </span>
          </h6>
        )}

        <p>{description}</p>
      </div>
      <div className="project__icons">
        <Link to="" title="Edit project">
          <EditIcon />
        </Link>
        <Link to="" title="Delete project">
          <DeleteIcon />
        </Link>
        <Link to="" title="More">
          <MoreIcon />
        </Link>
      </div>
    </div>
  );
}

export default ProjectNew;