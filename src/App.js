import Header from "./components/Header/Header";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./styles/common.css";

const App = () => {
  return (
    <>
      <Header />
      <TodoForm />
      <TodoList />
    </>
  );
};

export default App;
