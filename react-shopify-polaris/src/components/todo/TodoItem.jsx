import { Button, ResourceItem, Tag, TextStyle } from "@shopify/polaris";
import React from "react";
import useTodo from "../../hooks/useTodo";

const TodoItem = (item) => {
  const { toggleTodo, removeTodo } = useTodo();
  const { text, id } = item;
  return (
    <ResourceItem id={id}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
          <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
            {text}
          </TextStyle>
        </div>
        <Tag>{item.isCompleted ? "Done" : "Pending"}</Tag>
        <Button primary onClick={() => toggleTodo(id)}>
          Toggle complete
        </Button>
        <Button destructive onClick={() => removeTodo(id)}>
          Delete
        </Button>
      </div>
    </ResourceItem>
  );
};

export default TodoItem;
