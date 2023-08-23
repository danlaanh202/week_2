import React, { useState } from "react";
import Todo from "../todo/Todo";
import TodoForm from "../todo/TodoForm";
import useFetchApi from "../../hooks/useFetchApi";
import fetchData from "../../helpers/utils/requestApi";

const App = () => {
  const { data: todoes, setData: setTodoes } = useFetchApi("/todoes");

  const createTodo = async (text, callback) => {
    try {
      const { data, success } = await fetchData({
        url: "/todo",
        data: {
          text,
          isCompleted: false,
        },
        method: "POST",
      });
      if (success) {
        setTodoes((prev) => [data, ...prev]);
        callback();
      }
    } catch (error) {
      alert("Can't create new todo");
    }
  };
  const toggleTodo = async (id) => {
    try {
      const { success } = await fetchData({
        url: `/todo/${id}`,
        method: "PUT",
      });
      if (success) {
        setTodoes((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }
    } catch (error) {
      alert("Can not toggle todo");
    }
  };
  const deleteTodo = async (id) => {
    try {
      const { success } = await fetchData({
        url: `/todo/${id}`,
        method: "DELETE",
      });
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("Something went wrong when delete");
    }
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todoes?.length > 0 &&
          todoes.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        <TodoForm createTodo={createTodo} />
      </div>
    </div>
  );
};

export default App;
