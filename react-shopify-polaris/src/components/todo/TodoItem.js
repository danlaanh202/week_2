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

const TodoItem = ({ todo, setTodoes }) => {
  const { putData } = usePutTodo("/todo");
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
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    const { success } = await deleteData(`/${id}`);
    if (success) {
      setTodoes((prev) => prev.filter((item) => item.id !== id));
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
            loading={deleteLoading}
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
