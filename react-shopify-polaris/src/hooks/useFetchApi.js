import { useEffect, useState } from "react";
import { ROOT_API } from "../helpers/constants/apiConstants";

const useFetchApi = (path = "", url = ROOT_API) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchUrl = url + path;
      const response = await fetch(fetchUrl);
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
  return { data, setData, loading, setLoading };
};

export default useFetchApi;
