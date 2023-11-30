import { configureStore } from "@reduxjs/toolkit";

import { todosReducer } from "./slice";

// Створення Redux store з використанням configureStore
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
