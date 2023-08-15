import React from "react";
import Todo from "../components/todo/Todo";
import TodoForm from "../components/todo/TodoForm";
import useTodo from "../hooks/useTodo";

const App = () => {
  const { todos } = useTodo();

  return (
    <div className="app">
      <div className="todo-list">
        {todos?.map((todo, index) => (
          <Todo index={index} key={index} todo={todo} />
        ))}
        <TodoForm />
      </div>
    </div>
  );
};

export default App;
