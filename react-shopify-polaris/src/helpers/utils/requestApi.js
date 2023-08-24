import { ROOT_API } from "../constants/apiConstants";
//todo: mình có thể tách base APi ra riêng và đuôi path đằng sao ra thành 2 biến , base api thì mình truyền mặc định :3 nào cần path thì mình truyền thêm :3 kiểu thế trông ke hơn là em phải truyền url dang {basurl}{path}
async function fetchData({
  url = ROOT_API,
  method = "GET",
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
  const res = await fetch(fetchUrl, method === "GET" ? {} : requestConfig);
  return res.json();
}
export default fetchData;
