import fs from "fs";
const { data: todoes } = require("./todoes.json");

function saveTodo(data) {
  fs.writeFileSync(
    "./lib/database/todoes.json",
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
  const result = tempTodoes.filter((item) => item.id !== parseInt(id));
  console.log(result);
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
  const tempTodoes = [...todoes];
  for (let i = ids.length - 1; i >= 0; i--) {
    tempTodoes = tempTodoes.filter((item) => item.id !== ids[i]);
  }
  saveTodo(tempTodoes);
  return tempTodoes;
}
export function toggleMultipleTodoes(ids) {
  const tempTodoes = [...todoes];
  for (let i = ids.length - 1; i >= 0; i--) {
    tempTodoes = tempTodoes.map((item) => {
      if (item.id === ids[i]) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
  }
  saveTodo(tempTodoes);
}
