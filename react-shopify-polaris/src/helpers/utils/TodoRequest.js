import fetchData from "./requestApi";

class TodoRequest {
  async createTodo(text) {
    return await fetchData({
      method: "POST",
      data: {
        text,
        isCompleted: false,
      },
      path: "/todo",
    });
  }
  async toggleTodo(todo) {
    return await fetchData({
      path: `/todo/${todo.id}`,
      method: "PUT",
      data: { todo: { ...todo, isCompleted: !todo.isCompleted } },
    });
  }
  async removeTodo(id) {
    return await fetchData({
      path: `/todo/${id}`,
      method: "DELETE",
    });
  }
  async toggleTodos(todos) {
    return await fetchData({
      path: "/todos",
      method: "PUT",
      data: { todos },
    });
  }
  async removeTodos(ids) {
    return await fetchData({
      path: "/todos",
      method: "DELETE",
      data: { ids },
    });
  }
}

export default new TodoRequest();
