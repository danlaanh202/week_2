import { useEffect, useState } from "react";
import { ROOT_API } from "../helpers/constants/apiConstants";

const useFetchApi = (path) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${ROOT_API}${path}`);
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
