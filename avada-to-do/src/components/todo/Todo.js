import React, { useEffect, useState } from "react";

import Spinner from "../ui/Spinner";

import fetchData from "../../helpers/utils/requestApi";

const Todo = ({ todo, setTodoes }) => {
  const [loading, setLoading] = useState(false);
  const toggleTodo = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const { success } = await fetchData({
        url: "/todo",
        method: "PUT",
        data: { id },
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
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    if (loading) return;
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo">
      <div
        className="todo-text"
        style={{ textDecoration: todo?.isCompleted ? "line-through" : "" }}
      >
        {todo?.text}
      </div>
      <div className="btn-container">
        <button onClick={() => toggleTodo(todo.id)}>
          {loading ? (
            <Spinner />
          ) : (
            <span>{todo?.isCompleted ? "Undo" : "Complete"}</span>
          )}
        </button>
        <button style={{ color: "red" }} onClick={() => deleteTodo(todo.id)}>
          {loading ? <Spinner /> : <span>X</span>}
        </button>
      </div>
    </div>
  );
};

export default Todo;
