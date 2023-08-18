import { useState } from "react";
import { rootApi } from "../helpers/constants";

const usePutTodo = (url) => {
  const [loading, setLoading] = useState(false);
  const putData = async (body) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}`, {
        method: "PUT",
        body: JSON.stringify(body),
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
