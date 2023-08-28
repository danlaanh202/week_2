import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import useToast from "../../hooks/useToast";

const TodoItem = ({ todo, toggleTodo, removeTodo }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleClick = async (id, callback) => {
    if (loading) return;
    try {
      setLoading(true);
      await callback(id);
    } catch (error) {
      showToast("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

  return (
    <Stack distribution="equalSpacing">
      <TextStyle variant="bodyMd" fontWeight="bold" as="h3">
        {todo.text}
      </TextStyle>

      <Stack>
        <Badge status={todo.isCompleted ? "success" : ""}>
          {todo.isCompleted ? "Done" : "Pending"}
        </Badge>

        <Button
          onClick={() => handleClick(todo.id, toggleTodo)}
          primary={!todo.isCompleted}
          loading={loading}
          // disabled={isLoading}
        >
          {todo.isCompleted ? "Undo" : "Complete"}
        </Button>
        <Button
          onClick={() => handleClick(todo.id, removeTodo)}
          destructive
          loading={loading}
          // disabled={isLoading}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default TodoItem;
