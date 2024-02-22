import { configureStore } from "@reduxjs/toolkit";
import CalendarTaskSlice from "./Calendar/CalendarTaskSlice";

const store = configureStore({
  reducer: {
    calendarTask: CalendarTaskSlice,
  },
});

export default store;
