import {
  ResourceList,
  Card,
  EmptyState,
  Button,
  ButtonGroup,
} from "@shopify/polaris";

import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import useTodo from "../../hooks/useTodo";
import CreateTodoModal from "../CreateTodoModal";

export default function TodoTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };

  const { todos, removeTodoMultiple, toggleTodoMultiple } = useTodo();
  const emptyStateMarkup = !todos.length ? (
    <EmptyState
      heading="Create todo to get started"
      action={<CreateTodoModal />}
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
            <Button destructive>Delete all</Button>
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
        items={todos}
        renderItem={TodoItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyState={emptyStateMarkup}
        selectable
      />
    </Card>
  );
}
