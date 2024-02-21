/* eslint-disable react/prop-types */
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
// import AppointmentEvent from "./AppointmentEvent";
import {
  useAppointments,
  useCreateAppointment,
  useGetPlannedTasksByUser,
  useUpdateAppointment,
} from "../requests";
import "./index.css";
import AppointmentEvent from "./AppointmentEvent";
import { useCallback, useEffect } from "react";
import getWeek from "../util/getWeekNumOfDate";
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
  // plannedTasksData,
}) => {
  const { data } = useAppointments();
  const { createAppointment } = useCreateAppointment();
  const { updateAppointment } = useUpdateAppointment();

  /*
  const plannedTasks = plannedTasksData?.plannedTasks?.tasks?.map((task) => ({
    ...task,
    start: new Date("Wed Feb 21 2024 9:00:00 GMT+0700 (GMT+07:00)"),
    end: new Date("Wed Feb 21 2024 11:00:00 GMT+0700 (GMT+07:00)"),
    isDraggable: true,
    isResizable: true,
  }));

  const plannedTasksComponents = {
    event: ({ event }) => {
      console.log(event);
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
  */

  const appointments = data?.map((appointment) => ({
    start: new Date(appointment.start),
    end: new Date(appointment.end),
    data: { appointment },
    isDraggable: appointment.isDraggable,
    isResizable: appointment.isResizable,
  }));

  const components = {
    event: ({ event }) => {
      const data = event?.data;
      if (data?.appointment)
        return <AppointmentEvent appointment={data?.appointment} />;
      return null;
    },
  };

  const onChangeEventTime = useCallback(
    ({ event, start, end }) => {
      console.log("onEventDrop", { event, start, end });

      const updateEvent = {
        ...event?.data?.appointment,
        start: new Date(start),
        end: new Date(end),
      };

      updateAppointment(updateEvent);
    },
    [updateAppointment]
  );

  const onDroppedFromOutside = useCallback(
    ({ start, end }) => {
      const newEvent = {
        ...draggedEvent,
        start: new Date(start),
        end: new Date(end),
        // isDraggable: true,
        // isResizable: true,
      };
      console.log(newEvent);
      updateAppointment(newEvent);
    },
    [draggedEvent, updateAppointment]
  );

  return (
    <div>
      <DndCalendar
        onSelectSlot={({ start, end }) => {
          onShowAppointmentView({ start, end });
        }}
        onDoubleClickEvent={(event) => {
          const appointment = event?.data?.appointment;
          appointment && onShowAppointmentView(appointment);
        }}
        /*
      events={plannedTasks}
      components={plannedTasksComponents}
      */
        events={appointments}
        components={components}
        style={{ width: "100%" }}
        draggableAccessor={"isDraggable"}
        resizableAccessor={"isResizable"}
        onEventDrop={onChangeEventTime}
        onDropFromOutside={onDroppedFromOutside}
        onEventResize={onChangeEventTime}
        selectable
        {...initProps}
      />
    </div>
  );
};
