import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plannedTask: [],
};

const plannedTaskSlice = createSlice({
  name: "plannedTask",
  initialState,
  reducers: {
    addAllTasks(state, action) {
      state.plannedTask = action.payload;
    },
    addTask(state, action) {
      state.plannedTask.push(action.payload);
    },
    updateTask: {
      prepare(taskId, updatedTask) {
        return {
          payload: { taskId, updatedTask },
        };
      },

      reducer(state, action) {
        state.plannedTask = state.plannedTask.map((task) =>
          task._id === action.payload.taskId
            ? { ...task, ...action.payload.updatedTask }
            : task
        );
      },
    },
    deleteTask(state, action) {
      state.plannedTask = state.plannedTask.filter(
        (task) => task._id !== action.payload
      );
    },
  },
});

export const { addAllTasks, addTask, updateTask, deleteTask } =
  plannedTaskSlice.actions;

export default plannedTaskSlice.reducer;

export const getPlannedTask = (state) => state.plannedTask.plannedTask;
