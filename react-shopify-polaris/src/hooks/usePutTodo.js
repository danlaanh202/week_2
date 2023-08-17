import { useState } from "react";
import { rootApi } from "../constants";

const usePutTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const putData = async (path) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}${path}`, {
        method: "PUT",
      }).then((res) => res.json());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { putData, loading };
};

export default usePutTodo;
