import { useDispatch } from "react-redux";
import { useDeleteTaskInPlannedTask } from "../requests";
import { deleteTask } from "./CalendarTaskSlice";

/* eslint-disable react/prop-types */
function TaskItem({ task, setDraggedEvent }) {
  const dispatch = useDispatch();
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
      <button
        onClick={() => {
          dispatch(deleteTask(_id));
          deleteTaskInPlannedTask(_id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
