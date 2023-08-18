import React from "react";
import { v4 as uuidv4 } from "uuid";
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
    try {
      const { success, data } = await postData({
        id: uuidv4(),
        text,
        isCompleted: false,
      });
      if (success) {
        setTodoes((prev) => [data, ...prev]);
      }
      return { success };
    } catch (error) {
      throw new Error();
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
