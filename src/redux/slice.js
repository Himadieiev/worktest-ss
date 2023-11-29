import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, getTodos } from "./thunk";

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
      })
      .addCase(addTodo.pending, handlePending)
      .addCase(addTodo.rejected, handleRejected)
      .addCase(addTodo.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          items: state.items
            ? [...state.items, action.payload]
            : [action.payload],
        };
      })
      .addCase(deleteTodo.pending, handlePending)
      .addCase(deleteTodo.rejected, handleRejected)
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const todosReducer = todoSlice.reducer;
