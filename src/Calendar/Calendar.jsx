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
      const updateEvent = {
        ...event,
        start,
        end,
        startDate: start,
        endDate: end,
      };

      setPlannedTasks((prevEvents) =>
        prevEvents.map((prevEvent) =>
          prevEvent._id === event._id ? updateEvent : prevEvent
        )
      );
      updateTaskInPlannedTask(updateEvent);
    },
    [updateTaskInPlannedTask, setPlannedTasks]
  );

  const onDroppedFromOutside = useCallback(
    ({ start, end }) => {
      const newEvent = {
        ...draggedEvent,
        start,
        end,
        startDate: start,
        endDate: end,
      };
      setPlannedTasks((prevEvents) => {
        const index = prevEvents.findIndex(
          (event) => event._id === draggedEvent._id
        );

        if (index !== -1) {
          return prevEvents.map((event, i) => {
            if (i === index) return newEvent;
            return event;
          });
        } else {
          return [...prevEvents, newEvent];
        }
      });
      updateTaskInPlannedTask(newEvent);
    },
    [draggedEvent, updateTaskInPlannedTask, setPlannedTasks]
  );

  // const onChangeEventTime = useCallback(
  //   ({ event, start, end }) => {
  //     console.log("onEventDrop", { event, start, end });

  //     const updateEvent = {
  //       ...event?.data?.appointment,
  //       start: new Date(start),
  //       end: new Date(end),
  //     };

  //     updateAppointment(updateEvent);
  //   },
  //   [updateAppointment]
  // );

  // const onDroppedFromOutside = useCallback(
  //   ({ start, end }) => {
  //     const newEvent = {
  //       ...draggedEvent,
  //       start: new Date(start),
  //       end: new Date(end),
  //       // isDraggable: true,
  //       // isResizable: true,
  //     };
  //     console.log(newEvent);
  //     updateAppointment(newEvent);
  //   },
  //   [draggedEvent, updateAppointment]
  // );

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
