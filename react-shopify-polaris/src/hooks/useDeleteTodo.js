import { useState } from "react";
import { rootApi } from "../constants";

const useDeleteTodo = (firstPath) => {
  const [loading, setLoading] = useState(false);
  const deleteData = async (secondPath) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${firstPath}${secondPath}`, {
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
