export default function (arr, name) {
  let str = arr.reduce((prev, curr) => prev + `${name}=${curr}&`, "?");
  return str.substring(0, str.length - 1);
}
