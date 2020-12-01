import React from "react";
import "./ProjectNew.css";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreIcon from "@material-ui/icons/More";
import { Link } from "react-router-dom";
import { Modal, Fade, Backdrop } from "@material-ui/core";
import DeleteModal from "../modal/DeleteModal";

function ProjectNew({
  projectTitle,
  description,
  status,
  completeTasks,
  allTasks,
  id,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <button type="button" onClick={handleOpen} title="Delete project">
            <DeleteIcon />
          </button>

          <Link to={`/projectss/${id}`} title="More">
            <MoreIcon />
          </Link>
        </div>
      </div>
      <DeleteModal
        open={open}
        handleClose={handleClose}
        id={id}
        type="project"
      />
    </>
  );
}

export default ProjectNew;
