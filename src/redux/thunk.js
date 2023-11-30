import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/todos";

// Асинхронна дія для отримання списку todo
export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async ({ page, limit }, thunkAPI) => {
    try {
      const res = await axios.get(`/?_page=${page}&_limit=${limit}`);
      const totalTodos = res.headers["x-total-count"];
      const todosData = res.data;
      return { totalTodos, todosData };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для додавання todo
export const addTodo = createAsyncThunk(
  "todos/addTask",
  async ({ title, text, priority }, thunkAPI) => {
    try {
      const res = await axios.post("/", {
        id: Date.now(),
        title,
        text,
        priority,
      });
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для видалення todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      await axios.delete(`/${todoId}`);
      return { id: todoId };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Асинхронна дія для оновлення todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ todoId, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(`/${todoId}`, updatedData);
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
