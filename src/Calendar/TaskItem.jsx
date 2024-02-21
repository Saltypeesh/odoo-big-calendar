import { useDeleteAppointment } from "../requests";

/* eslint-disable react/prop-types */
function TaskItem({ task, setDraggedEvent }) {
  const { id, location, address } = task;
  const { deleteAppointment } = useDeleteAppointment();

  return (
    <div
      style={{ background: "#FFF", padding: "12px", cursor: "pointer" }}
      onDragStart={() => setDraggedEvent(task)}
      draggable
    >
      <h4 style={{ fontSize: "20px", margin: 0 }}>{location}</h4>
      <p>{address}</p>
      <button onClick={() => deleteAppointment(id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
