import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { rootApi } from "../constants";


const usePost = (path) => {
  const [loading, setLoading] = useState(false);
  const postData = async (text) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          text,
          isCompleted: false,
        }),
      }).then((resp) => resp.json());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    postData,
  };
};

export default usePost;
