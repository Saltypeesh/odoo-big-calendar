/* eslint-disable react/prop-types */
import { useState } from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";
import { getPlannedTask } from "./CalendarTaskSlice";

// const dummyAppointment = {
//   id: 3,
//   status: "CI",
//   location: "Connecticut",
//   resource: "Alex Hales",
//   address: "1241 E Main St\n Stamford\n CT 06902\n United States",
// };

function TaskContainer({ setDraggedEvent }) {
  const [openForm, setOpenForm] = useState(false);
  const plannedTask = useSelector(getPlannedTask);

  return (
    <div
      style={{
        flexGrow: 1,
        flexBasis: "30%",
        background: "#F5F5F5",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        overflowY: "scroll",
        borderRadius: "4px",
        border: "1px solid #E8EAED",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {plannedTask.length > 0 &&
          plannedTask.map((task, index) => (
            <TaskItem
              task={task}
              key={index}
              setDraggedEvent={setDraggedEvent}
            />
          ))}
      </div>
      <button
        onClick={() => setOpenForm(!openForm)}
        style={{
          background: "#9B1C1F",
          border: "none",
          width: 60,
          height: 60,
          padding: "12px",
          borderRadius: "50%",
          textAlign: "center",
          margin: "0 auto",
          cursor: "pointer",
          boxShadow:
            "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
        }}
      >
        <img
          style={{
            width: 36,
            height: 36,
          }}
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36' fill='none'%3E%3Cpath d='M18 7.5V28.5' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M7.5 18H28.5' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E"
          alt="SVG Image"
        />
      </button>
      {/* {openForm && <EventForm />} */}
    </div>
  );
}

export default TaskContainer;
