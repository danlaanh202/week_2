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
  const removeTodoMultiple = (ids) => {
    console.log(ids);
    dispatch({
      type: "REMOVE_TODO_MULTIPLE",
      payload: {
        ids,
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
  const toggleTodoMultiple = (ids) => {
    dispatch({
      type: "TOGGLE_TODO_MULTIPLE",
      payload: {
        ids,
      },
    });
  };
  const value = {
    todos: state,
    addTodo,
    removeTodo,
    removeTodoMultiple,
    toggleTodo,
    toggleTodoMultiple,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
