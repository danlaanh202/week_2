import getIndexOfTodo from "../utils/getIndexOfTodo";
import { v4 as uuidv4 } from "uuid";
const TodoReducer = (state, action) => {
  const tempTodos = [...state];
  switch (action.type) {
    case "CREATE_TODO":
      return [
        {
          text: action.payload.text.trim(),
          isCompleted: false,
          id: uuidv4(),
        },
        ...state,
      ];

    case "REMOVE_TODO":
      tempTodos.splice(getIndexOfTodo(tempTodos, action.payload.id), 1);
      return tempTodos;

    case "TOGGLE_TODO":
      const index = getIndexOfTodo(tempTodos, action.payload.id);
      tempTodos[index].isCompleted = !tempTodos[index].isCompleted;
      return tempTodos;

    case "REMOVE_TODO_MULTIPLE":
      for (let i = action.payload.ids.length - 1; i >= 0; i--)
        tempTodos.splice(getIndexOfTodo(tempTodos, action.payload.ids[i]), 1);
      return tempTodos;
    case "TOGGLE_TODO_MULTIPLE":
      for (let i = action.payload.ids.length - 1; i >= 0; i--) {
        const index = getIndexOfTodo(tempTodos, action.payload.ids[i]);
        tempTodos[index].isCompleted = !tempTodos[index]?.isCompleted;
        tempTodos[index].id = uuidv4();
      }
      return tempTodos;
    case "REMOVE_TODO_ALL":
      return [];
    default:
      return state;
  }
};

const initialTodos = [];

export const initializerTodo = (initialValue = initialTodos) =>
  JSON.parse(localStorage.getItem("localTodo")) || initialValue;

export default TodoReducer;
