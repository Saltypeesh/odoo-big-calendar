/* eslint-disable react/prop-types */
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
// import AppointmentEvent from "./AppointmentEvent";
import { useUpdateTaskInPlannedTask } from "../requests";
import "./index.css";
// import AppointmentEvent from "./AppointmentEvent";
import { useCallback } from "react";
import PlannedTaskEvent from "./PlannedTaskEvent";
// import { EVENTS } from "./Calendar.constants";
import { useDispatch, useSelector } from "react-redux";
import { getPlannedTask, updateTask } from "./CalendarTaskSlice";

const localizer = momentLocalizer(moment);

const currentDate = new Date();

const initProps = {
  localizer: localizer,
  defaultDate: currentDate,
  views: ["month", "week", "day"],
  defaultView: "week",
  min: moment("2025-02-20T07:00:00").toDate(),
  max: moment("2023-02-20T13:00:00").toDate(),
  step: 15,
  timeslots: 4,
};

const DndCalendar = withDragAndDrop(BigCalendar);

export const Calendar = ({ onShowAppointmentView, draggedEvent }) => {
  const { updateTaskInPlannedTask } = useUpdateTaskInPlannedTask();
  const dispatch = useDispatch();
  const plannedTask = useSelector(getPlannedTask);

  const convertedPlannedTask = plannedTask.map((task) => ({
    ...task,
    start: new Date(task.start),
    end: new Date(task.end),
  }));

  const plannedTaskComponents = {
    event: ({ event }) => {
      // console.log(event);
      const data = event;
      if (data)
        return (
          <PlannedTaskEvent
            task={data}
            // onDoubleClick={onShowAppointmentView}
          />
        );
      return null;
    },
  };

  const onChangeEventTime = useCallback(
    ({ event, start, end }) => {
      const updateEvent = {
        ...event,
        start: start.toISOString(),
        end: end.toISOString(),
      };

      dispatch(updateTask(event._id, updateEvent));
      updateTaskInPlannedTask(updateEvent);
    },
    [updateTaskInPlannedTask, dispatch]
  );

  const onDroppedFromOutside = useCallback(
    ({ start, end }) => {
      const newEvent = {
        ...draggedEvent,
        start: start.toISOString(),
        end: end.toISOString(),
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };

      const existedId = convertedPlannedTask.find(
        (event) => event._id === draggedEvent._id
      )._id;

      dispatch(updateTask(existedId, newEvent));
      updateTaskInPlannedTask(newEvent);
    },
    [draggedEvent, convertedPlannedTask, dispatch, updateTaskInPlannedTask]
  );

  return (
    <DndCalendar
      onSelectSlot={({ start, end }) => {
        onShowAppointmentView({ start, end });
      }}
      onDoubleClickEvent={(event) => {
        const task = event;
        task && onShowAppointmentView(task);
      }}
      events={convertedPlannedTask}
      components={plannedTaskComponents}
      style={{ width: "100%" }}
      draggableAccessor={"isDraggable"}
      resizableAccessor={"isResizable"}
      onEventDrop={onChangeEventTime}
      onDropFromOutside={onDroppedFromOutside}
      onEventResize={onChangeEventTime}
      selectable
      {...initProps}
    />
  );
};
