import {useDeleteTaskInPlannedTask } from "../requests";

/* eslint-disable react/prop-types */
function TaskItem({ task, setDraggedEvent }) {
  const { _id, title, matterName } = task;
  const { deleteTaskInPlannedTask } = useDeleteTaskInPlannedTask();

  return (
    <div
      style={{ background: "#FFF", padding: "12px", cursor: "pointer" }}
      onDragStart={() => setDraggedEvent(task)}
      draggable
    >
      <h4 style={{ fontSize: "20px", margin: 0 }}>{title}</h4>
      <p>{matterName}</p>
      <button onClick={() => deleteTaskInPlannedTask(_id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
