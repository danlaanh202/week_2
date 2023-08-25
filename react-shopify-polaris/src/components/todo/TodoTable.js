import { ResourceList, Card, EmptyState, Stack } from "@shopify/polaris";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";
import useToast from "../../hooks/useToast";

export default function TodoTable({
  todos,
  createTodo,
  fetchLoading,
  toggleTodo,
  removeTodo,
}) {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async (ids, callback) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { success } = await callback(ids);
      if (success) setSelectedItems([]);
    } catch (error) {
      showToast("Error");
    } finally {
      setIsLoading(false);
    }
  };

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  const emptyStateMarkup = (
    <EmptyState
      heading="Create todo to get started"
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p style={{ marginBottom: 20 }}>Empty todo!!</p>
      <CreateTodoModal createTodo={createTodo} />
    </EmptyState>
  );

  const filterControlMarkup = (
    <Stack alignment="center">
      <Stack.Item>
        <CreateTodoModal createTodo={createTodo} />
      </Stack.Item>
    </Stack>
  );
  //todo: bỏ cái này đi nhé 
  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);
  return (
    <Card>
      <ResourceList
        filterControl={filterControlMarkup}
        resourceName={resourceName}
        items={todos}
        loading={fetchLoading}
        selectedItems={selectedItems}
        onSelectionChange={(sItems) => {
          if (isLoading) {
            return;
          }
          setSelectedItems(sItems);
        }}
        emptyState={emptyStateMarkup}
        promotedBulkActions={[
          {
            content: "Toggle complete",
            onAction: () => handleClick(selectedItems, toggleTodo),
            disabled: isLoading,
          },
          {
            content: "Delete",
            onAction: () => handleClick(selectedItems, removeTodo),
            disabled: isLoading,
          },
        ]}
        renderItem={(item) => (
          <TodoItem
            todo={item}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            isDisabled={isLoading}
          />
        )}
        selectable
      />
    </Card>
  );
}
