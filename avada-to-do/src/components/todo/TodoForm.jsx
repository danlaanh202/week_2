import React from "react";
import useTodo from "../../hooks/useTodo";

const TodoForm = () => {
  const [value, setValue] = React.useState("");
  const { addTodo } = useTodo();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        Add to do
      </button>
    </form>
  );
};

export default TodoForm;
