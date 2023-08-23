import { ResourceList, Card, EmptyState, Stack } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";
import useToast from "../../hooks/useToast";

export default function TodoTable({
  todoes,
  createTodo,
  fetchLoading,
  createTodoLoading,
  removeMultipleTodoes,
  toggleMultipleTodoes,
  toggleTodo,
  removeTodo,
}) {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [multipleDeleteLoading, setMultipleDeleteLoading] = useState(false);
  const [multipleToggleLoading, setMultipleToggleLoading] = useState(false);
  const removeMultipleClick = async (ids) => {
    if (multipleDeleteLoading) return;
    setMultipleDeleteLoading(true);
    try {
      const { success } = await removeMultipleTodoes(ids);
      if (success) setSelectedItems([]);
    } catch (error) {
    } finally {
      setMultipleDeleteLoading(false);
    }
  };
  const toggleMultipleClick = async (ids) => {
    if (multipleToggleLoading) return;
    setMultipleToggleLoading(true);
    try {
      const { success } = await toggleMultipleTodoes(ids);
      if (success) setSelectedItems([]);
    } catch (error) {
      showToast("Error toggle multiple");
    } finally {
      setMultipleToggleLoading(false);
    }
  };

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };

  const emptyStateMarkup = !todoes.length ? (
    <EmptyState
      heading="Create todo to get started"
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p style={{ marginBottom: 20 }}>Empty todo!!</p>
      <CreateTodoModal
        createTodo={createTodo}
        createTodoLoading={createTodoLoading}
      />
    </EmptyState>
  ) : undefined;

  const filterControlMarkup = (
    <Stack alignment="center">
      <Stack.Item>
        <CreateTodoModal
          createTodo={createTodo}
          createTodoLoading={createTodoLoading}
        />
      </Stack.Item>
    </Stack>
  );

  return (
    <Card>
      <ResourceList
        filterControl={filterControlMarkup}
        resourceName={resourceName}
        items={todoes}
        loading={fetchLoading}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        emptyState={emptyStateMarkup}
        promotedBulkActions={[
          {
            content: "Toggle complete",
            onAction: () => toggleMultipleClick(selectedItems),
            disabled: multipleToggleLoading,
          },
          {
            content: "Delete",
            onAction: () => removeMultipleClick(selectedItems),
            disabled: multipleDeleteLoading,
          },
        ]}
        renderItem={(item) => (
          <TodoItem
            todo={item}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        )}
        selectable
      />
    </Card>
  );
}
