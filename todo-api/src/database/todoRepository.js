import fs from "fs";
const { data: todoes } = require("./todoes.json");
import path from "path";
function saveTodo(data) {
  fs.writeFileSync(
    path.join(__dirname, "/todoes.json"),
    JSON.stringify({
      data,
    })
  );
}

export function getAllTodoes() {
  return todoes;
}

export function createTodo(data) {
  const updatedTodoes = [data, ...todoes];
  saveTodo(updatedTodoes);
}

export function removeTodo(id) {
  const tempTodoes = [...todoes];
  const result = tempTodoes.filter((item) => item.id !== id);

  saveTodo(result);
}

export function toggleTodo(id) {
  const tempTodoes = [...todoes];
  const result = tempTodoes.map((item, index) => {
    if (item.id === id) {
      return { ...item, isCompleted: !item.isCompleted };
    }
    return item;
  });
  saveTodo(result);
}
export function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    removeTodoes();
  }
  console.log(ids);
  let tempTodoes = [...todoes];
  for (let i = ids.length - 1; i >= 0; i--) {
    tempTodoes = tempTodoes.filter((item) => item.id !== ids[i]);
  }
  saveTodo(tempTodoes);
  return tempTodoes;
}
export function toggleMultipleTodoes(ids) {
  if (!ids) {
    return;
  }

  const tempTodoes = todoes.map((item) => {
    if (ids.includes(item.id)) {
      return { ...item, isCompleted: !item.isCompleted };
    }
    return item;
  });

  saveTodo(tempTodoes);
}

export function removeTodoes() {
  saveTodo([]);
}
