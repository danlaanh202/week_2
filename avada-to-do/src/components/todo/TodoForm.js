import { useState } from "react";
import Spinner from "../ui/Spinner";
import fetchData from "../../helpers/utils/requestApi";
import { v4 as uuidv4 } from "uuid";
const TodoForm = ({ setTodoes }) => {
  const [value, setValue] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const createTodo = async (text) => {
    setPostLoading(true);
    try {

      const { data, success } = await fetchData({
        url: "todo",
        data: {
          //todo : thay vì gen id ở đây thì liệu mình có thể gen id ở backend và trả về id ở đây để lấy đc id khộng em nhỉ 
          id: uuidv4(),
          text,
          isCompleted: false,
        },
        method: "POST",
      });
      if (success) {
        setTodoes((prev) => [data, ...prev]);
        setValue("");
      }
    } catch (error) {
      alert("Can't create new todo");
    } finally {
      setPostLoading(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //todo chỗ này nên thông báo gì đó để khách biết không đc thêm khoảng trắng chứ nhề 
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
