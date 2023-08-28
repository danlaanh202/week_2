const { data: todos } = require("./todos.json");
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

function saveTodo(data) {
  fs.writeFileSync(
    path.join(__dirname, "/todos.json"),
    JSON.stringify({
      data,
    })
  );
}

export async function getTodoById(id) {
  return todos.find((item) => item.id === id);
}

export async function getAlltodos() {
  return todos;
}

export async function createTodo(data) {
  const generatedId = uuidv4();
  const updatedTodo = { ...data, id: generatedId };
  const updatedtodos = [{ ...data, id: generatedId }, ...todos];
  saveTodo(updatedtodos);
  return updatedTodo;
}
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// await delay(2000);
export async function toggleTodo(ids) {
  const tempTodos = todos.map((item) =>
    ids.includes(item.id) ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(tempTodos);
  return tempTodos;
}

export async function removeTodo(ids) {
  const tempTodos = todos.filter((item) => !ids.includes(item.id));
  saveTodo(tempTodos);
  return tempTodos;
}

// export async function toggleMultipleTodos(ids) {
//   if (!ids?.length) {
//     throw new Error();
//   }
//   const temptodos = todos.map((item) =>
//     ids.includes(item.id) ? { ...item, isCompleted: !item.isCompleted } : item
//   );
//   saveTodo(temptodos);
// }
// export async function removeMultipletodos(ids) {
//   if (!ids?.length) {
//     throw new Error();
//   }
//   const temptodos = todos.filter((item) => !ids.includes(item.id));
//   saveTodo(temptodos);
//   return temptodos;
// }
