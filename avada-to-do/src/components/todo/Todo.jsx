import React from "react";

const Todo = ({ todo, todoId, deleteTodo, toggleTodo }) => {
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
          {todo?.isCompleted ? "Uncomplete" : "Complete"}
        </button>
        <button style={{ color: "red" }} onClick={() => deleteTodo(todoId)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Todo;
