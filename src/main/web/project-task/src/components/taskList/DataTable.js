import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export const columns = [
  {
    name: "#",
    width: "60px",
    selector: "id",
    sortable: true,
    cell: (row) => <div>{row.id}</div>,
  },
  {
    name: "Task Name",
    width: "140px",
    selector: "taskName",
    sortable: true,
    cell: (row) => <div>{row.taskName}</div>,
  },
  {
    name: "Description",
    selector: "description",
    width: "260px",
    sortable: true,
    cell: (row) => <div>{row.description}</div>,
  },
  {
    name: "Priority",
    width: "100px",
    selector: "priority",
    sortable: true,
    cell: (row) => <div>{row.priority}</div>,
  },
  {
    name: "Status",
    width: "100px",
    selector: "status",
    sortable: true,
    cell: (row) => <div>{row.status}</div>,
  },
  {
    name: "Start Date",
    selector: "startDate",
    width: "110px",
    sortable: true,
    cell: (row) => <div>{row.startDate}</div>,
  },
  {
    name: "Finish Date",
    selector: "finishDate",
    width: "110px",
    sortable: true,
    cell: (row) => <div>{row.finishDate}</div>,
  },
  {
    name: "Edit/Delete",
    width: "100px",
    cell: (row) => (
      <div>
        <EditIcon
          className="iconHover"
          title="Edit"
          onClick={() => console.log("Edit")}
        />
        <DeleteIcon
          className="iconHover"
          title="Delete"
          onClick={() => console.log("Delete")}
        />
      </div>
    ),
  },
];

export const conditionalRowStyles = [
  {
    when: (row) => row.status === "done",
    style: {
      backgroundColor: "#fef8f5",
      color: "#eb5d1e",
    },
  },
];

// export const createTheme =
//   ("solarized",
//   {
//     text: {
//       primary: "#4e4039",
//       secondary: "#4e4039",
//     },
//     context: {
//       background: "#4e4039",
//       text: "#FFFFFF",
//     },
//     divider: {
//       default: "#4e4039",
//     },
//     action: {
//       button: "rgba(0,0,0,.54)",
//       hover: "rgba(0,0,0,.08)",
//       disabled: "rgba(0,0,0,.12)",
//     },
//   });
