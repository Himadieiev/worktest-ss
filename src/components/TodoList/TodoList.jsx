import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import css from "./TodoList.module.css";
import { getTodos } from "../../redux/thunk";
import TodoItem from "../TodoItem/TodoItem";
import {
  selectIsLoading,
  selectTodos,
  selectTotalTodos,
} from "../../redux/selectors";
import Modal from "../Modal/Modal";
import TodoForm from "../TodoForm/TodoForm";
import Loader from "../Loader/Loader";

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const totalTodos = useSelector(selectTotalTodos);
  const isLoading = useSelector(selectIsLoading);

  // Розрахунок загальної кількості сторінок для пагінації
  const totalPages = Math.ceil(totalTodos / 5);

  // Функція для відкриття/закриття модального вікна та передачі todo для редагування
  const toggleModal = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(!isModalOpen);
  };

  // Обробник зміни сторінки пагінації
  const handlePageChange = ({ selected }) => {
    const page = selected + 1;
    dispatch(getTodos({ page, limit: 5 }));
  };

  // Ефект для завантаження першої сторінки при відображенні компонента
  useEffect(() => {
    dispatch(getTodos({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <main className={`${css.todoList} container`}>
      {isLoading && <Loader />}
      {todos.length !== 0 && (
        <ul className={css.list}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleModal={toggleModal} />
          ))}
        </ul>
      )}

      {(todos.length !== 0 || todos.length !== 1) && (
        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={css.pagination}
          pageClassName={css.page}
          previousClassName={css.previous}
          nextClassName={css.next}
          activeClassName={css.active}
        />
      )}

      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <TodoForm toggleModal={toggleModal} editTodo={editTodo} />
        </Modal>
      )}
    </main>
  );
};

export default TodoList;
