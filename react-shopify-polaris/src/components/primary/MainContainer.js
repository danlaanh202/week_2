import React, { useState } from "react";
import MainPage from "./MainPage";
import TodoTable from "../todo/TodoTable";
import useFetchApi from "../../hooks/useFetchApi";
import fetchData from "../../helpers/utils/requestApi";
import useToast from "../../hooks/useToast";

const MainContainer = () => {
  const [createTodoLoading, setCreateTodoLoading] = useState(false);
  const { showToast } = useToast();
  const {
    data: todoes,
    setData: setTodoes,
    loading: getLoading,
  } = useFetchApi("/todoes");
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
  const toggleTodo = async (id) => {
    try {
      const { success } = await fetchData({
        url: `/todo/${id}`,
        method: "PUT",
      });
      if (!success) {
        showToast("Remove error");
        return;
      }
      setTodoes((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isCompleted: !item.isCompleted,
              }
            : item
        )
      );
      return { success };
    } catch (error) {
      showToast("Error Toggle Todo");
    }
  };
  const removeTodo = async (id) => {
    try {
      const { success } = await fetchData({
        url: `/todo/${id}`,
        method: "DELETE",
      });
      if (!success) {
        showToast("Remove todo error");
      }
      setTodoes((prev) => prev.filter((item) => item.id !== id));
      return success;
    } catch (error) {
      showToast("Error remove todo");
    }
  };
  const removeMultipleTodoes = async (ids) => {
    try {
      const { success } = await fetchData({
        url: "/todoes",
        data: { ids },
        method: "DELETE",
      });
      if (!success) {
        showToast("Remove error");
        return;
      }

      setTodoes((prev) => [...prev].filter((item) => !ids.includes(item.id)));

      return { success };
    } catch (error) {
      showToast("Error remove multiple");
    }
  };
  const toggleMultipleTodoes = async (ids) => {
    try {
      const { success } = await fetchData({
        url: "/todoes",
        data: { ids },
        method: "PUT",
      });
      if (!success) {
        showToast("Failed calling api");
        return;
      }
      setTodoes((prev) =>
        [...prev].map((item) =>
          ids.includes(item.id)
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      );
      return { success };
    } catch (error) {
      showToast("Error toggle multiple");
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
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          removeMultipleTodoes={removeMultipleTodoes}
          toggleMultipleTodoes={toggleMultipleTodoes}
        />
      </div>
    </div>
  );
};

export default MainContainer;
