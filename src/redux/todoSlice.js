// src/redux/todoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ 1. Async thunk to fetch tasks from backend
export const fetchTasks = createAsyncThunk("todo/fetchTasks", async () => {
  const response = await axios.get("http://localhost:5000/api/todos"); // <-- change URL if needed
  return response.data;
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    taskList: [],
    loading: false,
    error: null,
    filter: "all", // 'all', 'completed', 'incompleted'
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
