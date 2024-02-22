import { configureStore } from "@reduxjs/toolkit";
import plannedTaskSlice from "./Calendar/plannedTaskSlice";

const store = configureStore({
  reducer: {
    plannedTask: plannedTaskSlice,
  },
});

export default store;
