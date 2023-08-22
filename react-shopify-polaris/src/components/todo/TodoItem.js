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
import fetchData from "../../helpers/utils/requestApi";

const TodoItem = ({ todo, setTodoes }) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const toggleTodo = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      const { success } = await fetchData({
        url: "/todo",
        method: "PUT",
        data: { id },
      });
      if (!success) {
        showToast("Toggle error");
        return;
      }
      setTodoes((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isCompleted: !item.isCompleted,
              }
            : item
        )
      );
    } catch (error) {
      showToast("Error toggle todo");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setLoading(true);
    try {
      const { success } = await fetchData({
        url: `/todo/${id}`,
        method: "DELETE",
      });
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
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
            onClick={() => toggleTodo(todo.id)}
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
            onClick={() => removeTodo(todo.id)}
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
