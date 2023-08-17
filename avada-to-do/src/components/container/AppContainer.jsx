import React from "react";
import Todo from "../todo/Todo";
import TodoForm from "../todo/TodoForm";
import useFetchApi from "../../hooks/useFetchApi";
import usePost from "../../hooks/usePost";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import usePutTodo from "../../hooks/usePutTodo";

const App = () => {
  const [todoes, setTodoes, loading] = useFetchApi("/todoes");
  const { deleteData } = useDeleteTodo("/todo");
  const { postData } = usePost("/todo");
  const { putData, loading: toggleLoading } = usePutTodo("/todo");
  const createTodo = (text) => {
    postData(text).then(({ data }) => setTodoes((prev) => [data, ...prev]));
  };
  const deleteTodo = (id) => {
    deleteData(id).then(({ success }) => {
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    });
  };

  const toggleTodo = (id) => {
    putData(id).then(({ success }) => {
      if (success) {
        setTodoes((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }
    });
  };
  return (
    <div className="app">
      <div className="todo-list">
        {todoes?.map((todo) => (
          <Todo
            todoId={todo.id}
            key={todo.id}
            todo={todo}
            setTodoes={setTodoes}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        ))}
        <TodoForm createTodo={createTodo} />
      </div>
    </div>
  );
};

export default App;
