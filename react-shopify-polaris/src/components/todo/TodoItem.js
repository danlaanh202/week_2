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

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {

  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const toggleClick = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      await toggleTodo([id]);
    } catch (error) {
      showToast("Error toggle todo");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const removeClick = async (id) => {
    setLoading(true);
    try {
      await removeTodo([id]);
    } catch (error) {
      showToast("Error remove todo");
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
            onClick={() => toggleClick(todo.id)}
            loading={loading}
            primary
            fullWidth
          >
            {todo.isCompleted ? "Undo" : "Complete"}
          </Button>
          <Button
            fullWidth
            loading={loading}
            disabled={loading}
            onClick={() => removeClick(todo.id)}
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
