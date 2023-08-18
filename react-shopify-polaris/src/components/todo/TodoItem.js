import {
  Badge,
  Button,
  ButtonGroup,
  ResourceItem,
  Stack,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import usePutTodo from "../../hooks/usePutTodo";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import useToast from "../../hooks/useToast";

const TodoItem = ({ todo, setTodoes }) => {
  const { showToast } = useToast();
  const { putData, loading: toggleLoading } = usePutTodo("/todo");
  const { deleteData, loading: deleteLoading } = useDeleteTodo("/todo");
  const toggleTodo = async (id) => {
    try {
      const { success } = await putData({ id });
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
    }
  };

  const removeTodo = async (id) => {
    try {
      const { success } = await deleteData(`/${id}`);
      if (success) {
        setTodoes((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      showToast("Error remove todo");
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
            Toggle complete
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
