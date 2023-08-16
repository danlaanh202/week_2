export default function (arr, id) {
  return arr.map((item) => item.id).indexOf(parseInt(id));
}
