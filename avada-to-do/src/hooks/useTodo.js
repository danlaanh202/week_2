import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";

const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within TodoContext");
  }
  return context;
};
export default useTodo;
