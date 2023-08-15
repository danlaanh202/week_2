import { Button, ResourceItem, Stack, Tag, TextStyle } from "@shopify/polaris";
import React from "react";
import useTodo from "../../hooks/useTodo";

const TodoItem = (item) => {
  const { text, index } = item;
  const { toggleTodo, removeTodo } = useTodo();
  return (
    <ResourceItem id={index}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
          <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
            {text}
          </TextStyle>
        </div>
        <Tag>{item.isCompleted ? "Done" : "Pending"}</Tag>
        <Button primary onClick={() => toggleTodo(index)}>
          {item.isCompleted ? "Uncomplete" : "Complete"}
        </Button>
        <Button destructive onClick={() => removeTodo(index)}>
          Delete
        </Button>
      </div>
    </ResourceItem>
  );
};

export default TodoItem;
