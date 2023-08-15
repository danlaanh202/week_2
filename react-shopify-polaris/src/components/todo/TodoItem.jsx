import { Button, ResourceItem, Stack, Tag, TextStyle } from "@shopify/polaris";
import React from "react";

const TodoItem = (item) => {
  const { text, index } = item;
  return (
    <ResourceItem id={index}>
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
          <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
            {text}
          </TextStyle>
        </div>
        <Tag>Pending</Tag>
        <Button primary>Complete</Button>
        <Button>Delete</Button>
      </div>
    </ResourceItem>
  );
};

export default TodoItem;
