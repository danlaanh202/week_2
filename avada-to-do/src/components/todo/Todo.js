import React, { useEffect } from "react";
import usePutTodo from "../../hooks/usePutTodo";
import Spinner from "../ui/Spinner";
import useDeleteTodo from "../../hooks/useDeleteTodo";

const Todo = ({ todo, todoId, setTodoes }) => {
  const { putData, loading: toggleLoading } = usePutTodo("/todo");
  const toggleTodo = async (id) => {
    if (toggleLoading) return;
    try {
      const { success } = await putData({ id });
      if (success) {
        setTodoes((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
          )
        );
      }
    } catch (error) {
      alert("Can not toggle todo");
    }
  };
  //todo: mấy chỗ kiểu này thường thì bọn anh kahs là ít viết bằng hook ,
  // viết hook chỗ này nó khá là không cần thiết mà xong mình cần cần viết thêm 1 hàm deleteTodo 
  // thay vào đó mình có thể viết 1 hàm tổng quát dạng fetch data thì nó dễ xử lí hơn ở chỗ này mà có thể dùng cả PUT POST ..... . https://imgur.com/qWMPrmc tham khảo nhé . và viết lại chỗ này nhé .
  const { deleteData, loading: deleteLoading } = useDeleteTodo("/todo");
  const deleteTodo = async (id) => {
    try {
      const { success } = await deleteData(id);
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      alert("Something went wrong when delete");
    }
  };

  return (
    <div className="todo">
      <div
        className="todo-text"
        style={{ textDecoration: todo?.isCompleted ? "line-through" : "" }}
      >
        {todo?.text}
      </div>
      <div className="btn-container">
        <button onClick={() => toggleTodo(todoId)}>
          {toggleLoading ? (
            <Spinner />
          ) : (
            <span>{todo?.isCompleted ? "Undo" : "Complete"}</span>
          )}
        </button>
        <button style={{ color: "red" }} onClick={() => deleteTodo(todoId)}>
          {deleteLoading ? <Spinner /> : <span>X</span>}
        </button>
      </div>
    </div>
  );
};

export default Todo;
