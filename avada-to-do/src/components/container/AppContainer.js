import React, { useEffect } from "react";
import Todo from "../todo/Todo";
import TodoForm from "../todo/TodoForm";
import useFetchApi from "../../hooks/useFetchApi";

const App = () => {
  const {
    data: todoes,
    setData: setTodoes,
    loading: fetchLoading,
  } = useFetchApi("/todoes");

  useEffect(() => {
    console.log(todoes);
  }, [todoes]);
  return (
    <div className="app">
      <div className="todo-list">
        {todoes?.map((todo) => (
          <Todo
            todoId={todo.id}
            key={todo.id}
            todo={todo}
            setTodoes={setTodoes}
          />
        ))}
        <TodoForm setTodoes={setTodoes} />
      </div>
    </div>
  );
};

export default App;
