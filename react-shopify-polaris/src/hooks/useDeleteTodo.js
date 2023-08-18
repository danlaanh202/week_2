import { useState } from "react";
import { rootApi } from "../helpers/constants";

const useDeleteTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const deleteData = async (path) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}${path}`, {
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
