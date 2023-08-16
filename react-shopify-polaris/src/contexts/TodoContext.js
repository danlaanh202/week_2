import { createContext, useEffect, useReducer } from "react";
import todoReducer, { initializerTodo } from "../reducers/TodoReducer";
export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, [], initializerTodo);
  useEffect(() => {
    localStorage.setItem("localTodo", JSON.stringify(state));
  }, [state]);
  const addTodo = (text) => {
    dispatch({
      type: "CREATE_TODO",
      payload: {
        text,
      },
    });
  };
  const removeTodo = (id) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: {
        id,
      },
    });
  };
  const removeTodoMultiple = (ids) => {
    dispatch({
      type: "REMOVE_TODO_MULTIPLE",
      payload: {
        ids,
      },
    });
  };
  const toggleTodo = (id) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: {
        id,
      },
    });
  };
  const toggleTodoMultiple = (ids) => {
    dispatch({
      type: "TOGGLE_TODO_MULTIPLE",
      payload: {
        ids,
      },
    });
  };
  const deleteAll = () => {
    dispatch({
      type: "REMOVE_TODO_ALL",
    });
  };
  const value = {
    todos: state,
    addTodo,
    removeTodo,
    removeTodoMultiple,
    toggleTodo,
    toggleTodoMultiple,
    deleteAll,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
