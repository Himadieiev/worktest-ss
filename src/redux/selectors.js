export const selectTodos = (state) => state.todos.items;

export const selectTotalTodos = (state) => state.todos.totalTodos;

export const selectIsLoading = (state) => state.todos.isLoading;

export const selectError = (state) => state.todos.error;
