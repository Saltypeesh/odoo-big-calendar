/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useUpdateTaskInPlannedTask } from "../requests";
import FormRow from "../ui/FormRow";
import { useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask } from "../Calendar/CalendarTaskSlice";
import createTaskInPlannedTask from "../requests/createTaskInPlannedTask";
import deleteTaskInPlannedTask from "../requests/deleteTaskInPlannedTask";
import updateTaskInPlannedTask from "../requests/updateTaskInPlannedTask";

export default function EventForm({ task = {} }) {
  const dispatch = useDispatch();
   const [start, setStart] = useState(new Date(task.start) || new Date());
  const [end, setEnd] = useState(new Date(task.end) || new Date());

  const { _id: updateId, ...updateValues } = task;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });
  const { errors } = formState;

  function UpdateTask(id, updatedTask) {
    dispatch(updateTask(id, updatedTask));

    updateTaskInPlannedTask(updatedTask)
      .then((res) => {
        if (res.data.status === "success") {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function CreateTask(newTask) {
    dispatch(addTask(newTask));

    createTaskInPlannedTask(newTask)
      .then((res) => {
        if (res.data.status === "success") {
          console.log("success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  }

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

  const onSubmit = async (values) => {
    if (!isUpdateSession) {
      CreateTask({
        ...values,
        start: start.toISOString(),
        end: end.toISOString(),
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        isDraggable: true,
        isResizable: true,
      });
    } else {
      UpdateTask(task._id, {
        ...values,
        start: start.toISOString(),
        end: end.toISOString(),
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        _id: task._id,
      });
    }
  };

  useEffect(() => {
    setStart(new Date(task.start) || new Date());
    setEnd(new Date(task.end) || new Date());
  }, [task.start, task.end]);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "5px",
        background: "white",
        width: "100%",
        height: "100%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ fontSize: "2em", marginBottom: "1em" }}>
              {isUpdateSession ? "Update" : "Create"} an task
            </h1>
          </div>
          {isUpdateSession && (
            <button
              aria-label="delete"
              type="button"
              onClick={() => {
                DeleteTask(task._id);
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px  10px",
              }}
            >
              Delete
            </button>
          )}
        </div>

        <FormRow label="Title" error={errors?.title?.message}>
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "5px",
              padding: "8px 12px",
            }}
            type="text"
            id="title"
            //   disabled={isCreating}
            {...register("title", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
          <div style={{ flexBasis: "50%" }}>
            <label>Start Time</label>
            <DatePicker
              id="start"
              onChange={(date) => {
                setStart(date);
              }}
              selected={start}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
          <div style={{ flexBasis: "50%" }}>
            <label>End Time</label>
            <DatePicker
              id="end"
              onChange={(date) => {
                setEnd(date);
              }}
              selected={end}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: "1em",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px  10px",
          }}
        >
          {isUpdateSession ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
