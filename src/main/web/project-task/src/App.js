import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Project from "./components/Project";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import TaskList from "./components/TaskList";
import HomeJumbo from "./components/HomeJumbo";
import TaskBord from "./components/TaskBord";
import Footer from "./components/footer/Footer";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact key="jumbo" path="/" component={HomeJumbo} />
        <Route path="/projectForm" exact component={Project} />
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
