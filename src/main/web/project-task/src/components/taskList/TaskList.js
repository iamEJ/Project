import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { columns, conditionalRowStyles, createTheme } from "./DataTable";
import Fuse from "fuse.js";

function TaskList({ id, searchTerm }) {
  const [tasks, setTasks] = useState([]);

  const fuse = new Fuse(tasks, {
    keys: ["status", "taskName"],
  });
  const results = fuse.search(searchTerm);
  const tasksResults = searchTerm
    ? results.map((result) => result.item)
    : tasks;

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/projects/${id}/tasks`).then(
      (result) => {
        setTasks(result.data);
      }
    );
  }, [id]);

  console.log(id);

  return (
    <div>
      <DataTable
        title="The list of Tasks"
        columns={columns}
        data={tasksResults}
        highlightOnHover
        pagination
        conditionalRowStyles={conditionalRowStyles}
        // theme={createTheme}
        allowOverflow
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
      />
    </div>
  );
}

export default TaskList;
