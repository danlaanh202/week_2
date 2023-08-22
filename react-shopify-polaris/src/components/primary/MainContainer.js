import React, { useState } from "react";
import MainPage from "./MainPage";
import TodoTable from "../todo/TodoTable";
import useFetchApi from "../../hooks/useFetchApi";
import fetchData from "../../helpers/utils/requestApi";

const MainContainer = () => {
  const {
    data: todoes,
    setData: setTodoes,
    loading: getLoading,
  } = useFetchApi("/todoes");
  const [createTodoLoading, setCreateTodoLoading] = useState(false);
  const createTodo = async (text) => {
    setCreateTodoLoading(true);
    try {
      const { success, data } = await fetchData({
        method: "POST",
        data: {
          text,
          isCompleted: false,
        },
        url: "/todo",
      });
      setTodoes((prev) => [data, ...prev]);
      return { success };
    } catch (error) {
      throw new Error();
    } finally {
      setCreateTodoLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="main-container__content">
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
