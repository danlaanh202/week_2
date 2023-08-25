import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React, { useState } from "react";
import useToast from "../../hooks/useToast";

const TodoItem = ({ todo, toggleTodo, removeTodo, isDisabled }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleClick = async (id, callback) => {
    if (loading || isDisabled) return;
    setLoading(true);
    try {
      await callback([id]);
    } catch (error) {
      showToast("Error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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

          <Button
            onClick={() => handleClick(todo.id, toggleTodo)}
            loading={loading}
            primary
            fullWidth
          >
            {todo.isCompleted ? "Undo" : "Complete"}
          </Button>
          <Button
            fullWidth
            loading={loading}
            onClick={() => handleClick(todo.id, removeTodo)}
            destructive
          >
            Delete
          </Button>
        </ButtonGroup>
      </Stack>
    </ResourceItem>
  );
};

export default TodoItem;
