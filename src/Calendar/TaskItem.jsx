import { useDispatch } from "react-redux";
import { deleteTask } from "./CalendarTaskSlice";
import deleteTaskInPlannedTask from "../requests/deleteTaskInPlannedTask";

/* eslint-disable react/prop-types */
function TaskItem({ task, setDraggedEvent }) {
  const dispatch = useDispatch();
  const { _id, title, matterName } = task;

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
      style={{ background: "#FFF", padding: "12px", cursor: "pointer" }}
      onDragStart={() => setDraggedEvent(task)}
      draggable
    >
      <h4 style={{ fontSize: "20px", margin: 0 }}>{title}</h4>
      <p>{matterName}</p>
      <button
        onClick={() => {
          DeleteTask(_id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
