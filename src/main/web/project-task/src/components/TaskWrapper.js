import React from "react";
import Task from "./Task";
import { useParams } from "react-router";

function Info() {
  let { id } = useParams();
  return (
    <div className="d-flex flex-column">
      <Task id={id} />
    </div>
  );
}

export default Info;
