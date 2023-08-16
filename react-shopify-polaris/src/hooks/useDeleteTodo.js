import { useState } from "react";
import { rootApi } from "../constants";

const useDeleteTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const deleteData = async (id) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}/${id}`, {
        method: "DELETE",
      }).then((resp) => resp.json());
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { deleteData, loading };
};

export default useDeleteTodo;