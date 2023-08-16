import React from "react";
import { rootApi } from "../constants";

const usePutTodo = (url) => {
  const putData = async (id) => {
    try {
      return await fetch(`${rootApi}${url}/${id}`, {
        method: "PUT",
      }).then((res) => res.json());
    } catch (error) {}
  };
  return { putData };
};

export default usePutTodo;
