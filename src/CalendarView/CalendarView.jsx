import { useState } from "react";
import { Calendar } from "../Calendar/Calendar";
import EventForm from "../EventForm/EventForm";
import AppointmentEvent from "../Calendar/AppointmentEvent";
import getWeek from "../util/getWeekNumOfDate";
import { useAppointments, useGetPlannedTasksByUser } from "../requests";
import TaskItem from "../Calendar/TaskItem";
import TaskContainer from "../Calendar/TaskContainer";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentWeekNum = getWeek(currentDate);

function CalendarView() {
  const [appointment, setAppointment] = useState();
  const [draggedEvent, setDraggedEvent] = useState();

  const {
    data: plannedTasksData,
    // isLoading,
    // isError,
  } = useGetPlannedTasksByUser(currentWeekNum, currentYear);

  const { data: appointmentData } = useAppointments();

  const appointments =
    appointmentData?.map((appointmentEvent) => ({
      ...appointmentEvent,
      start: new Date(appointmentEvent.start),
      end: new Date(appointmentEvent.end),
      isDraggable: appointmentEvent.isDraggable,
      isResizable: appointmentEvent.isResizable,
    })) || [];

  return (
    <div style={{ display: "flex", gap: 10, height: "100%" }}>
      <TaskContainer
        appointments={appointments}
        setDraggedEvent={setDraggedEvent}
      />

      {appointment && (
        <EventForm appointment={appointment} key={appointment?.id} />
      )}

      <div style={{ flexGrow: 1, flexBasis: "70%" }}>
        {plannedTasksData && (
          <Calendar
            onShowAppointmentView={(appointment) => setAppointment(appointment)}
            draggedEvent={draggedEvent}
            plannedTasksData={plannedTasksData}
          />
        )}
      </div>
    </div>
  );
}

export default CalendarView;
