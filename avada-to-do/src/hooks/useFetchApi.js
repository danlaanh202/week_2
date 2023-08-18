import { useEffect, useState } from "react";
import { ROOT_API } from "../helpers/constants/apiConstants";

const useFetchApi = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${ROOT_API}${url}`);
      const responseData = await response.json();
      setData(responseData.data);
      setFetched(true);
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
  return { data, setData, loading, fetched };
};

export default useFetchApi;
