import React from "react";
import "./DeleteModal.css";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

function DeleteModal({ open, handleClose, id, type }) {
  const history = useHistory();

  const handleDelete = () => {
    Axios.delete(`http://localhost:8080/api/projects/${id}`).then((result) => {
      history.push("/projectss");
    });
  };
  return (
    <div>
      <Modal
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="deleteModal">
            <h2>Do you want to delete this {type}?</h2>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default DeleteModal;
