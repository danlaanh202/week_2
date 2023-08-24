import { ROOT_API } from "../constants/apiConstants";

async function fetchData({
  url = ROOT_API,
  path = "",
  method = "GET",
  data = {},
  isFetchApi = true,
}) {
  const baseUrl = url ?? ROOT_API;
  const fetchUrl = isFetchApi ? baseUrl + path : path;
  const requestConfig = {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(fetchUrl, method === "GET" ? {} : requestConfig);
  return res.json();
}
export default fetchData;
