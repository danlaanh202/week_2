import React from "react";
import Todo from "../todo/Todo";
import TodoForm from "../todo/TodoForm";
import useFetchApi from "../../hooks/useFetchApi";

const App = () => {
  const { data: todoes, setData: setTodoes } = useFetchApi("/todoes");

  return (
    <div className="app">
      <div className="todo-list">
        {todoes?.length > 0 &&
          todoes.map((todo) => (
            <Todo key={todo.id} todo={todo} setTodoes={setTodoes} />
          ))}
        <TodoForm setTodoes={setTodoes} />
      </div>
    </div>
  );
};

export default App;
