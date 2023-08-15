const TodoReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TODO":
      return [...state, { text: action.payload.text, isCompleted: false }];

    case "REMOVE_TODO":
      const newTodos = [...state];
      newTodos.splice(action.payload.index, 1);
      return newTodos;

    case "TOGGLE_TODO":
      const tempTodo = [...state];
      tempTodo[action.payload.index] = {
        ...tempTodo[action.payload.index],
        isCompleted: !tempTodo[action.payload.index].isCompleted,
      };
      return tempTodo;

    default:
      return state;
  }
};

const initialTodos = [];

export const initializerTodo = (initialValue = initialTodos) =>
  JSON.parse(localStorage.getItem("localTodo")) || initialValue;

export default TodoReducer;
