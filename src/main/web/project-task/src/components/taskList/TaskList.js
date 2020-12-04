import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import DataTable from "react-data-table-component";
import { columns, conditionalRowStyles, createTheme } from "./DataTable";

function TaskList({ id }) {
  const [tasks, setTasks] = useState([]);

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
        data={tasks}
        highlightOnHover
        pagination
        conditionalRowStyles={conditionalRowStyles}
        theme={createTheme}
      />
    </div>
  );
}

export default TaskList;