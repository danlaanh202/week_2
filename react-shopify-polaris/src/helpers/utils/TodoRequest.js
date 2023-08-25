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
  async toggleTodo(id) {
    return await fetchData({
      path: `/todo/${id}`,
      method: "PUT",
    });
  }
  async removeTodo(id) {
    return await fetchData({
      path: `/todo/${id}`,
      method: "DELETE",
    });
  }
  async toggleTodos(ids) {
    return await fetchData({
      path: "/todos",
      method: "PUT",
      data: { ids },
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
