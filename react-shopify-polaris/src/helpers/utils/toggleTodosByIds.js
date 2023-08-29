export default function toggleTodosByIds(todos, ids) {
  return todos
    .filter((todo) => ids.includes(todo.id))
    .map((todo) => ({ ...todo, isCompleted: !todo.isCompleted }));
}
// [{data}, {data}]
