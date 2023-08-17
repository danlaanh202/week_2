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
    return await postData(text).then(({ data }) =>
      setTodoes((prev) => [data, ...prev])
    );
  };

  return (
    <div className="main-container">
      <div className={`${styles["main-container__content"]}`}>
        <MainPage createTodo={createTodo} />
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
