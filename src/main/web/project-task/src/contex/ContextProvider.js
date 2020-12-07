import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/api/projects").then((result) => {
      setProjects(result.data);
    });
  }, []);

  return (
    <DataContext.Provider value={{ projects }}>{children}</DataContext.Provider>
  );
}
