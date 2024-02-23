/* eslint-disable no-unused-vars */
import { useDispatch } from "react-redux";
import { deleteTask } from "./CalendarTaskSlice";
import deleteTaskInPlannedTask from "../requests/deleteTaskInPlannedTask";

/* eslint-disable react/prop-types */
function TaskItem({ task, setDraggedEvent }) {
  const dispatch = useDispatch();
  const { _id, title, matterName, matterCode, start, end } = task;

  const dueDate = new Date(end).toLocaleDateString("en-GB");

  function DeleteTask(id) {
    dispatch(deleteTask(id));

    deleteTaskInPlannedTask(id)
      .then((res) => {
        if (res.data.status === "success") {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      style={{
        background: "#FFF",
        padding: "8px 13px 18px",
        cursor: "pointer",
        borderTop: "10px solid #F0BBBD",
        borderRadius: "2px",
        position: "relative",
      }}
      onDragStart={() => setDraggedEvent(task)}
      draggable
    >
      <img
        style={{ position: "absolute", top: 5, right: 4, cursor: "pointer" }}
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z' stroke='%23636874' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z' stroke='%23636874' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z' stroke='%23636874' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E"
        alt="SVG Image"
      />

      <h4 style={{ fontSize: "16px", margin: 0, color: "#7C1619" }}>{title}</h4>
      <p
        style={{
          margin: "27px 0 16px",
          paddingBottom: "12px",
          borderBottom: "1px solid #636874",
        }}
      >
        Matter code: {matterCode}abc-123
      </p>
      <div style={{ display: "flex", gap: "13.5px" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 8px",
            borderRadius: "2.5px",
            background: "#F8DEDF",
            fontSize: "12px",
          }}
        >
          <img
            width={18}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.5' height='12.5' viewBox='0 0 13 14' fill='none'%3E%3Cpath d='M6.25 2.83336C3.70885 2.83336 1.5625 4.97971 1.5625 7.52086C1.5625 10.062 3.70885 12.2084 6.25 12.2084C8.79115 12.2084 10.9375 10.062 10.9375 7.52086C10.9375 4.97971 8.79115 2.83336 6.25 2.83336ZM6.25 11.1667C4.27396 11.1667 2.60417 9.4969 2.60417 7.52086C2.60417 5.54482 4.27396 3.87503 6.25 3.87503C8.22604 3.87503 9.89583 5.54482 9.89583 7.52086C9.89583 9.4969 8.22604 11.1667 6.25 11.1667Z' fill='%23131313' fill-opacity='0.8'/%3E%3Cpath d='M6.77051 7.00001V4.91667H5.72884V8.04167H8.85384V7.00001H6.77051ZM9.00176 2.68074L9.73717 1.94324L11.3049 3.50574L10.5689 4.24376L9.00176 2.68074ZM3.48822 2.68074L1.93092 4.24272L1.19238 3.5073L2.74967 1.9448L3.48822 2.68074Z' fill='%23131313' fill-opacity='0.5'/%3E%3C/svg%3E"
            alt=""
          />
          45 min
        </span>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 8px",
            borderRadius: "2.5px",
            background: "#F8DEDF",
            fontSize: "12px",
          }}
        >
          <img
            width={15}
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='14' viewBox='0 0 13 14' fill='none'%3E%3Cpath d='M10.2917 2.66667H2.70833C2.11002 2.66667 1.625 3.1517 1.625 3.75001V11.3333C1.625 11.9316 2.11002 12.4167 2.70833 12.4167H10.2917C10.89 12.4167 11.375 11.9316 11.375 11.3333V3.75001C11.375 3.1517 10.89 2.66667 10.2917 2.66667Z' stroke='%232A2B28' stroke-width='1.08333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8.6665 1.58333V3.74999' stroke='%232A2B28' stroke-width='1.08333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M4.3335 1.58333V3.74999' stroke='%232A2B28' stroke-width='1.08333' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M1.625 5.91667H11.375' stroke='%232A2B28' stroke-width='1.08333' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
            alt=""
          />

          {dueDate}
        </span>

        <button
          onClick={() => {
            DeleteTask(_id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
