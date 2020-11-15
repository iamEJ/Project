import React from "react";
import "./Jumbotron.css";

function Jumbotron() {
  return (
    <div className="jumbotron">
      <div className="jumbotron__text">
        <h1>Welcome to project management system</h1>
        <p>
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don't simply skip over it entirely.
        </p>
        <button className="jumbotron__button">Create Project</button>
      </div>
      <div className="jumbotron__picture">
        <img alt="" src="/images/research.png" />
      </div>
    </div>
  );
}

export default Jumbotron;
