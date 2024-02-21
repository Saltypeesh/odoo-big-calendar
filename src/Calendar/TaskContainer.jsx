/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCreateAppointment } from "../requests";
import TaskItem from "./TaskItem";
import EventForm from "../EventForm/EventForm";

// const dummyAppointment = {
//   id: 3,
//   status: "CI",
//   location: "Connecticut",
//   resource: "Alex Hales",
//   address: "1241 E Main St\n Stamford\n CT 06902\n United States",
// };

function TaskContainer({ appointments, setDraggedEvent }) {
  const [openForm, setOpenForm] = useState(false);

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
      }}
    >
      {appointments.length > 0 &&
        appointments.map((task, index) => (
          <TaskItem task={task} key={index} setDraggedEvent={setDraggedEvent} />
        ))}
      <button onClick={() => setOpenForm(!openForm)}>Create</button>
      {/* {openForm && <EventForm />} */}
    </div>
  );
}

export default TaskContainer;
