import React, { useEffect, useState } from "react";

import Spinner from "../ui/Spinner";

import fetchData from "../../helpers/requestApi";

const Todo = ({ todo, todoId, setTodoes }) => {
  // const { putData, loading: toggleLoading } = usePutTodo("/todo");
  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const toggleTodo = async (id) => {
    if (toggleLoading) return;
    setToggleLoading(true);
    try {
      const { success } = await fetchData({
        url: "todo",
        data: { id },
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
    } finally {
      setToggleLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setDeleteLoading(true);
    try {
      const { success } = await fetchData({
        url: `todo/${id}`,
        method: "DELETE",
      });
      // deleteData(id);
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("Something went wrong when delete");
    } finally {
      setDeleteLoading(false);
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
        <button onClick={() => toggleTodo(todoId)}>
          {toggleLoading ? (
            <Spinner />
          ) : (
            <span>{todo?.isCompleted ? "Undo" : "Complete"}</span>
          )}
        </button>
        <button style={{ color: "red" }} onClick={() => deleteTodo(todoId)}>
          {deleteLoading ? <Spinner /> : <span>X</span>}
        </button>
      </div>
    </div>
  );
};

export default Todo;
