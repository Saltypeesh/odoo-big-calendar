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

export const Calendar = ({
  onShowAppointmentView,
  draggedEvent,
  plannedTasks,
  setPlannedTasks,
}) => {
  const { updateTaskInPlannedTask } = useUpdateTaskInPlannedTask();

  const plannedTasksComponents = {
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
      setPlannedTasks((prevEvents) =>
        // {
        //   console.log(prevEvents);
        //   return prevEvents;
        // }
        prevEvents.map((prevEvent) =>
          prevEvent._id === event._id
            ? { ...event, start, end, 
              // startDate: start, endDate: end 
            }
            : prevEvent
        )
      );

      // updateTaskInPlannedTask(updateEvent);
    },
    [
      // updateTaskInPlannedTask,
      setPlannedTasks,
    ]
  );

  const onDroppedFromOutside = useCallback(
    ({ start, end }) => {
      const newEvent = {
        ...draggedEvent,
        startDate: new Date(start),
        endDate: new Date(end),
      };
      updateTaskInPlannedTask(newEvent);
      start,
      end,
      resource,

      setPlannedTasks((prevEvents) => [
        ...prevEvents,
        {
          start,
          end,
          data: { appointment: draggedEvent },
          isDraggable: true,
          isResizable: true,
        },
      ]);

    },
    [draggedEvent, updateTaskInPlannedTask]
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
      events={plannedTasks}
      components={plannedTasksComponents}
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
