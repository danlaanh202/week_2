
//todo: ủa anh thấy biến này có rồi mà nhỉ :3 sao không dùng mà phải khai báo lại thế 
//với cả thường là anh thấy mn để là http://localhost:5000/api để khi truyển path vô nó không bị khó hiểu và truyền theo dạng này path = "/something" chẳng hạn
const BASE_URL = "http://localhost:5000/api/";

async function fetchData({
  url = BASE_URL,
  method = "get",
  data = {},
  isFetchApi = true,
}) {
  const fetchUrl = isFetchApi ? BASE_URL + url : url;
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
