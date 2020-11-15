import React from "react";
import "./WhatCanYouDo.css";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

function WhatCanYouDo() {
  return (
    <div className="whatCanYouDo">
      <h1>What you can do here:</h1>
      <hr />
      <div className="whatCanYouDo__list">
        <h5>
          <CheckRoundedIcon /> Create new project and view the projets list
        </h5>
        <h5>
          <CheckRoundedIcon />
          Create tasks for the project
        </h5>
        <h5>
          <CheckRoundedIcon />
          View the tasks list and task board
        </h5>
        <h5>
          <CheckRoundedIcon />
          Create, update, delete and search for projects and tasks
        </h5>
      </div>
    </div>
  );
}

export default WhatCanYouDo;
