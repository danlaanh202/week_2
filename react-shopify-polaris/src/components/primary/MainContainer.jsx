import React from "react";
import styles from "./MainContainer.module.css";
import MainPage from "./MainPage";
import TodoTable from "../todo/TodoTable";
import useFetchApi from "../../hooks/useFetchApi";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import usePutTodo from "../../hooks/usePutTodo";
import usePost from "../../hooks/usePost";
import { rootApi } from "../../constants";

const MainContainer = () => {
  const {
    data: todoes,
    setData: setTodoes,
    loading: getLoading,
  } = useFetchApi("/todoes");
  const { deleteData, loading: deleteLoading } = useDeleteTodo("/todoes");
  const { putData, loading: toggleTodoLoading } = usePutTodo("/todoes");
  const { postData, loading: createTodoLoading } = usePost("/todoes");
  const createTodo = (text) => {
    postData(text).then(({ data }) => setTodoes((prev) => [data, ...prev]));
  };
  const removeTodo = (id) => {
    deleteData(id).then(({ success }) => {
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    });
  };

  const toggleTodo = (id) => {
    putData(id).then(({ success }) => {
      if (success) {
        setTodoes((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }
    });
  };

  const removeMultipleTodo = async (ids) => {
    fetch(`${rootApi}/todoes/remove_multiple`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(({ success }) => {
        if (success) {
        }
      });
  };

  return (
    <div className="main-container">
      <div className={`${styles["main-container__content"]}`}>
        <MainPage createTodo={createTodo} />
        <TodoTable
          fetchLoading={getLoading}
          createTodoLoading={createTodoLoading}
          todoes={todoes}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          createTodo={createTodo}
          removeMultipleTodo={removeMultipleTodo}
        />
      </div>
    </div>
  );
};

export default MainContainer;
