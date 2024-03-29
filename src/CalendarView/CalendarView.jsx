import { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import TaskContainer from "../Calendar/TaskContainer";
// import { useGetPlannedTasksByUser } from "../requests";
import { useDispatch } from "react-redux";
import { addAllTasks } from "../Calendar/CalendarTaskSlice";
import getPlannedTaskById from "../requests/getPlannedTaskById";

// const currentDate = new Date();
const currentYear = 2023;
const currentWeekNum = 18;

function CalendarView() {
  const [draggedEvent, setDraggedEvent] = useState();
  const [openForm, setOpenForm] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getPlannedTaskById(currentWeekNum, currentYear)
      .then((res) => {
        dispatch(
          addAllTasks(
            res.data?.plannedTasks?.tasks?.map((task) => ({
              ...task,
              start: task?.startDate === null ? null : task?.startDate,
              end: task?.startDate === null ? null : task?.endDate,
              isDraggable: true,
              isResizable: true,
            })) || []
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div style={{ display: "flex", gap: 10, height: "100%" }}>
      <TaskContainer
        setDraggedEvent={setDraggedEvent}
        setOpenForm={setOpenForm}
      />

      <div style={{ flexGrow: 1, flexBasis: "70%" }}>
        <Calendar
          draggedEvent={draggedEvent}
          openForm={openForm}
          setOpenForm={setOpenForm}
        />
      </div>
    </div>
  );
}

export default CalendarView;
