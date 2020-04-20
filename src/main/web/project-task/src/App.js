import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Project from "./components/Project";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import Task from "./components/Task";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/projectForm" exact component={Project} />
        <Route path="/edit/:id" exact component={Project} />
        <Route path="/projects" exact component={ProjectList} />
        <Route path="/projects/:id" exact component={ProjectItem} />
        <Route path="/task-form" exact component={Task} />
      </Switch>
    </Router>
  );
}

export default App;
