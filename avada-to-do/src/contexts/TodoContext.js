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
  const removeTodo = (index) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: {
        index,
      },
    });
  };
  const toggleTodo = (index) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: {
        index,
      },
    });
  };
  const value = {
    todos: state,
    addTodo,
    toggleTodo,
    removeTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
