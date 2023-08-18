import { useState } from "react";

import { rootApi } from "../helpers/constants";

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const postData = async (body) => {
    setLoading(true);
    try {
      return await fetch(`${rootApi}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
