const { data: todoes } = require("./todoes.json");
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
function saveTodo(data) {
  fs.writeFileSync(
    path.join(__dirname, "/todoes.json"),
    JSON.stringify({
      data,
    })
  );
}
export function getTodoById(id) {
  return todoes.find((item) => item.id === id);
}
export function getAllTodoes() {
  return todoes;
}

export function createTodo(data) {
  const generatedId = uuidv4();
  const updatedTodo = { ...data, id: generatedId };
  const updatedTodoes = [updatedTodo, ...todoes];
  saveTodo(updatedTodoes);
  return updatedTodo;
}

export function removeTodo(id) {
  const tempTodoes = [...todoes];
  const result = tempTodoes.filter((item) => item.id !== id);
  saveTodo(result);
}

export function toggleTodo(id) {
  const result = [...todoes].map((item) =>
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(result);
}
export function removeMultipleTodoes(ids) {
  if (!ids || ids?.length === 0) {
    removeTodoes();
  }
  const tempTodoes = [...todoes].filter((item) => !ids.includes(item.id));
  saveTodo(tempTodoes);
  return tempTodoes;
}
export function completeMultipleTodoes(ids) {
  if (!ids) {
    return;
  }

  const tempTodoes = [...todoes].map((item) =>
    ids.includes(item.id) ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(tempTodoes);
}

export function removeTodoes() {
  saveTodo([]);
}
