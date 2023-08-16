import { useState } from "react";
import { rootApi } from "../constants";

const useDeleteTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const deleteData = async (id) => {
    try {
      return await fetch(`${rootApi}${url}/${id}`, {
        method: "DELETE",
      }).then((resp) => resp.json());
    } catch (error) {
    } finally {
    }
  };
  return { deleteData };
};

export default useDeleteTodo;
