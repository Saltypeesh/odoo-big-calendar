/* eslint-disable react/prop-types */
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
// import AppointmentEvent from "./AppointmentEvent";
// import { useUpdateTaskInPlannedTask } from "../requests";
import "./index.css";
import { useCallback, useEffect, useState } from "react";
import PlannedTaskEvent from "./PlannedTaskEvent";
// import { EVENTS } from "./Calendar.constants";
import { useDispatch, useSelector } from "react-redux";
import { getPlannedTask, updateTask } from "./CalendarTaskSlice";
import updateTaskInPlannedTask from "../requests/updateTaskInPlannedTask";
import EventForm from "../EventForm/EventForm";

const localizer = momentLocalizer(moment);

const currentDate = new Date();

const formats = {
  timeGutterFormat: (date, culture, localizer) =>
    localizer.format(date, "HH:mm", culture),
  eventTimeRangeFormat: ({ start, end }, culture, localizer) => {
    const startTime = localizer.format(start, "HH:mm", culture);
    const endTime = localizer.format(end, "HH:mm", culture);
    return `${startTime} - ${endTime}`;
  },
};

const initProps = {
  localizer: localizer,
  defaultDate: currentDate,
  views: ["month", "week", "day"],
  defaultView: "week",
  min: moment("2025-02-20T07:00:00").toDate(),
  max: moment("2023-02-20T14:00:00").toDate(),
  step: 15,
  timeslots: 4,
};

const DndCalendar = withDragAndDrop(BigCalendar);

export const Calendar = ({ draggedEvent, openForm, setOpenForm }) => {
  const dispatch = useDispatch();
  const plannedTask = useSelector(getPlannedTask);
  const [position, setPosition] = useState({ x: 500, y: 100 });
  const [appointment, setAppointment] = useState();

  const formSize = { width: 450, height: 500 };

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

  const UpdateTask = useCallback(
    (id, updatedTask) => {
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
    },
    [dispatch]
  );

  const onChangeEventTime = useCallback(
    ({ event, start, end }) => {
      const updateEvent = {
        ...event,
        start: start.toISOString(),
        end: end.toISOString(),
      };

      UpdateTask(event._id, updateEvent);
    },
    [UpdateTask]
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

      UpdateTask(existedId, newEvent);
    },
    [draggedEvent, convertedPlannedTask, UpdateTask]
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {position && openForm && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 9,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpenForm(false);
            }
          }}
        >
          <div
            style={{
              width: formSize.width,
              height: formSize.height,
              background: "white",
              position: "absolute",
              overflow: "hidden",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 0px 4px 0px",
              top: `${
                position.y + formSize.height / 2 + 50 > screenSize.height
                  ? position.y - formSize.height
                  : position.y - formSize.height / 2 < 100
                  ? position.y
                  : position.y - formSize.height / 2
              }px`,
              left: `${
                position.x + formSize.width + 10 > screenSize.width
                  ? position.x - formSize.width - 50
                  : position.x + 50
              }px`,
              zIndex: 10,
            }}
          >
            {openForm && (
              <EventForm task={appointment} key={appointment?._id} />
            )}
          </div>
        </div>
      )}
      <DndCalendar
        formats={formats}
        onSelectSlot={(event) => {
          setOpenForm(true);
          setPosition({
            x: event.box?.x || event.bounds.left,
            y: event.box?.y || event.bounds.top,
          });
          setAppointment({ start: event.start, end: event.end });
        }}
        onDoubleClickEvent={(event) => {
          event && setOpenForm(true);
          event && setAppointment(event);
          setPosition({ x: 500, y: 100 });
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
    </>
  );
};
