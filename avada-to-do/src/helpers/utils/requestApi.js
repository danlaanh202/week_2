import { ROOT_API } from "../constants/apiConstants";

async function fetchData({
  url = ROOT_API,
  method = "get",
  data = {},
  isFetchApi = true,
}) {
  const fetchUrl = isFetchApi ? ROOT_API + url : url;
  const requestConfig = {
    body: JSON.stringify(data),
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(fetchUrl, method === "get" ? {} : requestConfig);
  return res.json();
}
export default fetchData;
