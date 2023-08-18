import React, { useEffect } from "react";
import styles from "./MainContainer.module.css";
import MainPage from "./MainPage";
import TodoTable from "../todo/TodoTable";
import useFetchApi from "../../hooks/useFetchApi";
import usePost from "../../hooks/usePost";

const MainContainer = () => {
  const {
    data: todoes,
    setData: setTodoes,
    loading: getLoading,
  } = useFetchApi("/todoes");

  const { postData, loading: createTodoLoading } = usePost("/todo");
  const createTodo = async (text) => {
    const { success, data } = await postData(text);
    if (success) {
      setTodoes((prev) => [data, ...prev]);
    }
    return { success };
  };

  return (
    <div className="main-container">
      <div className={`${styles["main-container__content"]}`}>
        <MainPage />
        <TodoTable
          fetchLoading={getLoading}
          createTodoLoading={createTodoLoading}
          todoes={todoes}
          setTodoes={setTodoes}
          createTodo={createTodo}
        />
      </div>
    </div>
  );
};

export default MainContainer;
