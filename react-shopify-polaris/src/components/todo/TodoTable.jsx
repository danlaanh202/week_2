import {
  ResourceList,
  Card,
  EmptyState,
  Button,
  ButtonGroup,
  Stack,
} from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";

export default function TodoTable({
  todoes,
  toggleTodo,
  removeTodo,
  createTodo,
  fetchLoading,
  createTodoLoading,
}) {
  const removeTodoMultiple = () => {};
  const toggleTodoMultiple = () => {};

  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };

  const emptyStateMarkup = !todoes.length ? (
    <EmptyState
      heading="Create todo to get started"
      action={{
        content: (
          <CreateTodoModal
            createTodo={createTodo}
            createTodoLoading={createTodoLoading}
          />
        ),
      }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>Empty todo!!</p>
    </EmptyState>
  ) : undefined;

  return (
    <Card>
      <ResourceList
        filterControl={
          <Stack alignment="center">
            <Stack.Item fill>
              {todoes?.length > 0 && (
                <Button
                  onClick={() => removeTodoMultiple(selectedItems)}
                  destructive
                >
                  Delete all
                </Button>
              )}
            </Stack.Item>
            <Stack.Item>
              <CreateTodoModal
                createTodo={createTodo}
                createTodoLoading={createTodoLoading}
              />
            </Stack.Item>
          </Stack>
        }
        resourceName={resourceName}
        items={todoes}
        loading={fetchLoading}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyState={emptyStateMarkup}
        promotedBulkActions={[
          {
            content: "Complete",
            action: () => {},
          },
          {
            content: "Delete",
            action: () => {},
          },
        ]}
        renderItem={(item) => {
          return (
            <TodoItem
              todo={item}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          );
        }}
        selectable
      />
    </Card>
  );
}
