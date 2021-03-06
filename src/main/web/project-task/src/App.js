import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Project from "./components/Project";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import TaskList from "./components/TaskList";
import TaskBord from "./components/TaskBord";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";
import Jumbotron from "./components/jumbotron/Jumbotron";
import WhatCanYouDo from "./components/whatcanyoudo/WhatCanYouDo";
import ProjectForm from "./components/projectForm/ProjectForm";
import ProjectListNew from "./components/projectList/ProjectListNew";
import ProjectDetails from "./components/projectDetails.js/ProjectDetails";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Jumbotron />
          <WhatCanYouDo />
        </Route>
        <Route exact path="/addproject">
          <ProjectForm />
        </Route>
        <Route exact path="/projectss">
          <ProjectListNew />
        </Route>
        <Route path="/projectss/:id" children={<ProjectDetails />} />
        <Route path="/edit/:id" exact component={Project} />
        <Route exact key="home" path="/" component={ProjectList} />
        <Route exact key="projects" path="/projects" component={ProjectList} />
        <Route path="/projects/:id" exact component={ProjectItem} />
        <Route path="/tasks" exact component={TaskList} />
        <Route path="/projects/:id/taskbord" exact component={TaskBord} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
