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
  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const toggleTodo = async (id) => {
    if (toggleLoading) return;
    setToggleLoading(true);
    try {
      const { success } = await fetchData({
        url: "/todo",
        method: "PUT",
        data: { id },
      });
      if (success) {
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
      }
    } catch (error) {
      showToast("Error toggle todo");
      setToggleLoading(false);
    } finally {
      setToggleLoading(false);
    }
  };

  const removeTodo = async (id) => {
    setDeleteLoading(true);
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
      setDeleteLoading(false);
    } finally {
      setDeleteLoading(false);
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
            {todo.isCompleted && console.log("asdas")}
          </Badge>

          <Button
            onClick={() => toggleTodo(todo.id)}
            loading={toggleLoading}
            primary
          >
            {todo.isCompleted ? "Undo" : "Complete"}
          </Button>
          <Button
            loading={deleteLoading}
            disabled={deleteLoading}
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
