import { useEffect, useState } from "react";
import { rootApi } from "../helpers/constants";

const useFetchApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${rootApi}${url}`);
      const responseData = await response.json();

      setData(responseData.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, setData, loading };
};

export default useFetchApi;
