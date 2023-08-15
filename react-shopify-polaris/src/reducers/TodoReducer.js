const TodoReducer = (state, action) => {
  const tempTodos = [...state];
  switch (action.type) {
    case "CREATE_TODO":
      return [
        ...state,
        {
          text: action.payload.text.trim(),
          isCompleted: false,
          index: `${tempTodos.length}`,
        },
      ];

    case "REMOVE_TODO":
      tempTodos.splice(action.payload.index, 1);
      return tempTodos;

    case "TOGGLE_TODO":
      const isCompleted = !tempTodos[action.payload.index].isCompleted;
      tempTodos[action.payload.index] = {
        ...tempTodos[action.payload.index],
        isCompleted,
      };
      return tempTodos;

    case "REMOVE_TODO_MULTIPLE":
      for (var i = action.payload.ids.length - 1; i >= 0; i--)
        tempTodos.splice(action.payload.ids[i], 1);
      return tempTodos;
    case "TOGGLE_TODO_MULTIPLE":
      for (var i = action.payload.ids.length - 1; i >= 0; i--) {
        tempTodos[action.payload.ids[i]] = {
          ...tempTodos[action.payload.ids[i]],
          isCompleted: !tempTodos[action.payload.ids[i]].isCompleted,
        };
      }
    default:
      return state;
  }
};

const initialTodos = [];

export const initializerTodo = (initialValue = initialTodos) =>
  JSON.parse(localStorage.getItem("localTodo")) || initialValue;

export default TodoReducer;
