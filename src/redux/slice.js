import { createSlice } from "@reduxjs/toolkit";
import { getTodos } from "./thunk";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

const handleRejected = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, handlePending)
      .addCase(getTodos.rejected, handleRejected)
      .addCase(getTodos.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          items: action.payload,
        };
      });
  },
});

export const todosReducer = todoSlice.reducer;
