import { useEffect, useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import EventForm from "../EventForm/EventForm";
import TaskContainer from "../Calendar/TaskContainer";
import { useGetPlannedTasksByUser } from "../requests";

// const currentDate = new Date();
const currentYear = 2023;
const currentWeekNum = 18;

function CalendarView() {
  const [draggedEvent, setDraggedEvent] = useState();
  const [task, setTask] = useState();
  const [plannedTasks, setPlannedTasks] = useState([]);

  const {
    data: plannedTasksData,
    isLoading: isGetting,
    // isError,
  } = useGetPlannedTasksByUser(currentWeekNum, currentYear);

  useEffect(() => {
    if (!isGetting) {
      setPlannedTasks(
        plannedTasksData?.plannedTasks?.tasks?.map((task) => ({
          ...task,
          start: task?.startDate === null ? null : new Date(task?.startDate),
          end: task?.startDate === null ? null : new Date(task?.endDate),
          isDraggable: true,
          isResizable: true,
        })) || []
      );
    }
  }, [plannedTasksData, isGetting]);


  return (
    <div style={{ display: "flex", gap: 10, height: "100%" }}>
      <TaskContainer
        plannedTasks={plannedTasks}
        setDraggedEvent={setDraggedEvent}
      />

      {task && <EventForm setPlannedTasks={setPlannedTasks} task={task} key={task?._id} />}

      <div style={{ flexGrow: 1, flexBasis: "70%" }}>
        {plannedTasksData && (
          <Calendar
            onShowAppointmentView={(task) => setTask(task)}
            draggedEvent={draggedEvent}
            plannedTasks={plannedTasks}
            setPlannedTasks={setPlannedTasks}
          />
        )}
      </div>
    </div>
  );
}

export default CalendarView;
