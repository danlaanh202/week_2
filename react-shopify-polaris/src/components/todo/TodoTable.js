import {
  ResourceList,
  Card,
  EmptyState,
  Button,
  Stack,
  TextStyle,
  ButtonGroup,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import usePutTodo from "../../hooks/usePutTodo";
import arrayToQuery from "../../helpers/arrayToQuery";

export default function TodoTable({
  todoes,
  setTodoes,
  createTodo,
  fetchLoading,
  createTodoLoading,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { deleteData: deleteMultipleData, loading: multipleDeleteLoading } =
    useDeleteTodo("/todoes");
  const { putData: toggleMultipleData, loading: multipleToggleLoading } =
    usePutTodo("/todoes");
  const removeTodoMultiple = async (ids) => {
    try {
      const { success } = await deleteMultipleData(arrayToQuery(ids, "ids"));
      if (success) {
      }
    } catch (error) {}
  };
  const toggleTodoMultiple = async (ids) => {
    const { success } = await toggleMultipleData({ ids });
    if (success) {
      setTodoes((prev) =>
        [...prev].map((item) =>
          ids.includes(item.id)
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      );
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
