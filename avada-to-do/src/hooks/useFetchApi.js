const useFetchApi = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
      setLoading(false);
      setFetched(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return {
    data,
    setData,
    loading,
    fetched,
  };
};

export default useFetchApi;
