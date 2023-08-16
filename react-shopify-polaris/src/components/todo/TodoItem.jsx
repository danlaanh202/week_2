import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React from "react";

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  // const toggleTodo = (id) => {};
  // const removeTodo = (id) => {};
  return (
    <ResourceItem id={todo.id}>
      <Stack distribution="equalSpacing">
        <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
          {todo.text}
        </TextStyle>

        <ButtonGroup>
          <Badge status={todo.isCompleted ? "success" : ""}>
            {todo.isCompleted ? "Done" : "Pending"}
          </Badge>
          <Button primary onClick={() => toggleTodo(todo.id)}>
            Toggle complete
          </Button>
          <Button destructive onClick={() => removeTodo(todo.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </ResourceItem>
  );
};

export default TodoItem;
