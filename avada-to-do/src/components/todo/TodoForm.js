import { useState } from "react";
import Spinner from "../ui/Spinner";

const TodoForm = ({ createTodo }) => {
  const [value, setValue] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || !value?.trim()) {
      alert("Input mustn't be blank");
      return;
    }
    setPostLoading(true);
    try {
      await createTodo(value, () => setValue(""));
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="submit-btn btn">
        {postLoading ? <Spinner /> : <span>Add to do</span>}
      </button>
    </form>
  );
};

export default TodoForm;
