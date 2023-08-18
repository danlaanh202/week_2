import { useState } from "react";
import usePost from "../../hooks/usePost";
import Spinner from "../ui/Spinner";

const TodoForm = ({ setTodoes }) => {
  const [value, setValue] = useState("");

  const { postData, loading: postLoading } = usePost("/todo");
  const createTodo = async (text) => {
    try {
      const { data, success } = await postData(text);
      if (success) {
        setTodoes((prev) => [data, ...prev]);
        setValue("");
      }
    } catch (error) {
      alert("Can't create new todo");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    createTodo(value);
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
        {postLoading ? <Spinner /> : <span>Add to do</span>}
      </button>
    </form>
  );
};

export default TodoForm;
