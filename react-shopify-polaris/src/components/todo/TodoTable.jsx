import {
  ResourceList,
  Card,
  EmptyState,
  Button,
  ButtonGroup,
} from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";

export default function TodoTable({
  todoes,
  toggleTodo,
  removeTodo,
  createTodo,
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
      action={{ content: <CreateTodoModal createTodo={createTodo} /> }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>Empty todo!!</p>
    </EmptyState>
  ) : undefined;

  return (
    <Card>
      <ResourceList
        filterControl={
          <ButtonGroup>
            <Button
              onClick={() => removeTodoMultiple(selectedItems)}
              destructive
            >
              Delete selected
            </Button>
            <Button onClick={() => toggleTodoMultiple(selectedItems)} primary>
              Toggle complete
            </Button>
          </ButtonGroup>
        }
        resourceName={resourceName}
        items={todoes}
        renderItem={(item) => {
          return (
            <TodoItem
              todo={item}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          );
        }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyState={emptyStateMarkup}
        selectable
      />
    </Card>
  );
}
