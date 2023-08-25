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
export function getTodoById(id) {
  return todos.find((item) => item.id === id);
}
export function getAlltodos() {
  return todos;
}

export function createTodo(data) {
  const generatedId = uuidv4();
  const updatedTodo = { ...data, id: generatedId };
  const updatedtodos = [updatedTodo, ...todos];
  saveTodo(updatedtodos);
  return updatedTodo;
}

// export function removeTodo(id) {
//   const temptodos = [...todos];
//   const result = temptodos.filter((item) => item.id !== id);
//   saveTodo(result);
// }

// export function toggleTodo(id) {
//   const result = [...todos].map((item) =>
//     item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//   );
//   saveTodo(result);
// }
export function removeMultipletodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }
  const temptodos = [...todos].filter((item) => !ids.includes(item.id));
  saveTodo(temptodos);
  return temptodos;
}
export function completeMultipletodos(ids) {
  if (!ids?.length) {
    throw new Error();
  }

  const temptodos = [...todos].map((item) =>
    ids.includes(item.id) ? { ...item, isCompleted: !item.isCompleted } : item
  );
  saveTodo(temptodos);
}

export function removetodos() {
  saveTodo([]);
}
