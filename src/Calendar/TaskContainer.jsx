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
      }}
    >
      {plannedTask.length > 0 &&
        plannedTask.map((task, index) => (
          <TaskItem task={task} key={index} setDraggedEvent={setDraggedEvent} />
        ))}
      <button onClick={() => setOpenForm(!openForm)}>Create</button>
      {/* {openForm && <EventForm />} */}
    </div>
  );
}

export default TaskContainer;
