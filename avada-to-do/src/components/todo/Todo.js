import React, { useState } from "react";

import Spinner from "../ui/Spinner";

const Todo = ({ todo, toggleTodo, deleteTodo }) => {
  const [loading, setLoading] = useState(false);

  const toggleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await toggleTodo(todo.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await deleteTodo(todo.id);
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
      <div>
        <button className="btn" onClick={toggleClick}>
          {loading ? (
            <Spinner />
          ) : (
            <span>{todo?.isCompleted ? "Undo" : "Complete"}</span>
          )}
        </button>
        <button className="btn" style={{ color: "red" }} onClick={deleteClick}>
          {loading ? <Spinner /> : <span>Delete</span>}
        </button>
      </div>
    </div>
  );
};

export default Todo;
