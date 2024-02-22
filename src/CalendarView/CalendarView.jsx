import { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import EventForm from "../EventForm/EventForm";
import TaskContainer from "../Calendar/TaskContainer";
import { useGetPlannedTasksByUser } from "../requests";
import { useDispatch } from "react-redux";
import { addAllTasks } from "../Calendar/plannedTaskSlice";

// const currentDate = new Date();
const currentYear = 2023;
const currentWeekNum = 18;

function CalendarView() {
  const [draggedEvent, setDraggedEvent] = useState();
  const [task, setTask] = useState();
  const [tasksAdded, setTasksAdded] = useState(false);

  const dispatch = useDispatch();

  const {
    data: plannedTasksData,
    isLoading: isGetting,
    // isError,
  } = useGetPlannedTasksByUser(currentWeekNum, currentYear);

  useEffect(() => {
    if (!tasksAdded && !isGetting) {
      dispatch(
        addAllTasks(
          plannedTasksData?.plannedTasks?.tasks?.map((task) => ({
            ...task,
            start: task?.startDate === null ? null : task?.startDate,
            end: task?.startDate === null ? null : task?.endDate,
            isDraggable: true,
            isResizable: true,
          })) || []
        )
      );
      setTasksAdded(true);
    }
  }, [plannedTasksData, isGetting, dispatch, tasksAdded]);

  return (
    <div style={{ display: "flex", gap: 10, height: "100%" }}>
      <TaskContainer setDraggedEvent={setDraggedEvent} />

      {task && <EventForm task={task} key={task?._id} />}

      <div style={{ flexGrow: 1, flexBasis: "70%" }}>
        {plannedTasksData && (
          <Calendar
            onShowAppointmentView={(task) => setTask(task)}
            draggedEvent={draggedEvent}
          />
        )}
      </div>
    </div>
  );
}

export default CalendarView;
