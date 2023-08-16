import { Button, ResourceItem, Tag, TextStyle } from "@shopify/polaris";
import React from "react";

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  // const toggleTodo = (id) => {};
  // const removeTodo = (id) => {};
  return (
    <ResourceItem id={todo.id}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
          <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
            {todo.text}
          </TextStyle>
        </div>
        <Tag>{todo.isCompleted ? "Done" : "Pending"}</Tag>
        <Button primary onClick={() => toggleTodo(todo.id)}>
          Toggle complete
        </Button>
        <Button destructive onClick={() => removeTodo(todo.id)}>
          Delete
        </Button>
      </div>
    </ResourceItem>
  );
};

export default TodoItem;
