import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./thunk";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  totalTodos: 0,
};

// Функція для обробки стану під час виконання асинхронного запиту (pending)
const handlePending = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

// Функція для обробки стану в разі відхилення асинхронного запиту (rejected)
const handleRejected = (state, action) => {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
};

// Створення Slice для управління станом та екшенами для сутності "todos"
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
          items: action.payload.todosData,
          totalTodos: action.payload.totalTodos,
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
      })
      .addCase(updateTodo.pending, handlePending)
      .addCase(updateTodo.rejected, handleRejected)
      .addCase(updateTodo.fulfilled, (state, action) => {
        const updatedTodo = action.payload;
        const todoIdToUpdate = updatedTodo.id;
        const updatedItems = state.items.map((todo) =>
          todo.id === todoIdToUpdate ? updatedTodo : todo
        );
        state.items = updatedItems;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const todosReducer = todoSlice.reducer;
