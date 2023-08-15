import React, { useContext } from "react";

import useTodo from "../../hooks/useTodo";

const Todo = ({ todo, index }) => {
  const { removeTodo, toggleTodo } = useTodo();

  return (
    <div className="todo">
      <div
        className="todo-text"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}
      </div>
      <div className="btn-container">
        <button onClick={() => toggleTodo(index)}>
          {todo.isCompleted ? "Uncomplete" : "Complete"}
        </button>
        <button style={{ color: "red" }} onClick={() => removeTodo(index)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
