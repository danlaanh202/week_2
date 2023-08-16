import { useState } from "react";
import { rootApi } from "../constants";

const usePutTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const putData = async (id) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}/${id}`, {
        method: "PUT",
      }).then((res) => res.json());
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return { putData, loading };
};

export default usePutTodo;