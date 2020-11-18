import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <div className="navigation__logo">
        <Link to={"/"}>PATMSA</Link>
      </div>
      <div className="navigation__menu">
        <Link to={"/"}>Home</Link>
        <Link to={"/addproject"}>Create Project</Link>
        <Link to={"/projects"}>Project List</Link>
        <Link to={"/tasks"}>Task List</Link>
      </div>
    </div>
  );
}

export default Navigation;
