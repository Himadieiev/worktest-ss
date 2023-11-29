import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/todos";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTask",
  async ({ title, text, priority }, thunkAPI) => {
    try {
      const res = await axios.post("/", {
        id: Date.now(),
        title,
        text,
        priority,
        completed: false,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
