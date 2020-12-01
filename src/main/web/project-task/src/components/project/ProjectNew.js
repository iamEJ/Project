import React, { useState } from "react";
import "./ProjectNew.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreIcon from "@material-ui/icons/More";
import { Link } from "react-router-dom";
import DeleteModal from "../modal/DeleteModal";
import CostumSnackbar from "../snackbar/CostumSnackbar";

function ProjectNew({
  projectTitle,
  description,
  status,
  completeTasks,
  allTasks,
  id,
}) {
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <DeleteModal
        open={open}
        handleClose={handleCloseModal}
        id={id}
        type={projectTitle}
      />
      <div className="project">
        <div className="project__text">
          <Link to={`/projectss/${id}`}>{projectTitle}</Link>
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
          <button
            type="button"
            onClick={handleOpenModal}
            title="Delete project"
          >
            <DeleteIcon />
          </button>

          <Link to={`/projectss/${id}`} title="More">
            <MoreIcon />
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProjectNew;
