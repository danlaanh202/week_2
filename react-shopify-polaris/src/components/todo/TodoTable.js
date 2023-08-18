import { ResourceList, Card, EmptyState, Stack } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";

import useToast from "../../hooks/useToast";
import fetchData from "../../helpers/utils/requestApi";

export default function TodoTable({
  todoes,
  setTodoes,
  createTodo,
  fetchLoading,
  createTodoLoading,
}) {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [multipleDeleteLoading, setMultipleDeleteLoading] = useState(false);
  const [multipleToggleLoading, setMultipleToggleLoading] = useState(false);

  const removeTodoMultiple = async (ids) => {
    setMultipleDeleteLoading(true);
    try {
      const { success } = await fetchData({
        url: "todoes",
        data: { ids },
        method: "POST",
      });
      if (success) {
        setTodoes((prev) => [...prev].filter((item) => !ids.includes(item.id)));
        setSelectedItems([]);
      }
    } catch (error) {
      setMultipleDeleteLoading(false);
      showToast("Error remove multiple");
    } finally {
      setMultipleDeleteLoading(false);
    }
  };
  const toggleTodoMultiple = async (ids) => {
    setMultipleToggleLoading(true);
    try {
      const { success } = await fetchData({
        url: "todoes",
        data: { ids },
        method: "PUT",
      });
      if (success) {
        setTodoes((prev) =>
          [...prev].map((item) =>
            ids.includes(item.id) ? { ...item, isCompleted: true } : item
          )
        );
        setSelectedItems([]);
      }
    } catch (error) {
      showToast("Error toggle multiple");
      setMultipleToggleLoading(true);
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
            content: "Complete",
            onAction: () => toggleTodoMultiple(selectedItems),
            disabled: multipleToggleLoading,
          },
          {
            content: "Delete",
            onAction: () => removeTodoMultiple(selectedItems),
            disabled: multipleDeleteLoading,
          },
        ]}
        renderItem={(item) => <TodoItem setTodoes={setTodoes} todo={item} />}
        selectable
      />
    </Card>
  );
}
