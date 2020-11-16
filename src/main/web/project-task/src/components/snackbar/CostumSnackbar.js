import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./CostumSnackbar.css";

function CostumSnackbar({ message, handleClose, open }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      ContentProps={{
        className: "project__snackbar",
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={
        <div className="project__snackbarMessage">
          <p>
            <CheckCircleIcon /> {message}
          </p>
        </div>
      }
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}

export default CostumSnackbar;
