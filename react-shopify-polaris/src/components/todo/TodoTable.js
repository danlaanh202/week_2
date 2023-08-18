import { ResourceList, Card, EmptyState, Stack } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";
import usePutTodo from "../../hooks/usePutTodo";
import usePost from "../../hooks/usePost";
import useToast from "../../hooks/useToast";

export default function TodoTable({
  todoes,
  setTodoes,
  createTodo,
  fetchLoading,
  createTodoLoading,
}) {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const { postData: deleteMultipleData, loading: multipleDeleteLoading } =
    usePost("/todoes/remove-multiple");
  const { putData: toggleMultipleData, loading: multipleToggleLoading } =
    usePutTodo("/todoes");
  const removeTodoMultiple = async (ids) => {
    try {
      const { success } = await deleteMultipleData({ ids });
      if (success) {
        setTodoes((prev) => [...prev].filter((item) => !ids.includes(item.id)));
        setSelectedItems([]);
      }
    } catch (error) {
      showToast("Error remove multiple");
    }
  };
  const toggleTodoMultiple = async (ids) => {
    try {
      const { success } = await toggleMultipleData({ ids });
      if (success) {
        setTodoes((prev) =>
          [...prev].map((item) =>
            ids.includes(item.id)
              ? { ...item, isCompleted: !item.isCompleted }
              : item
          )
        );
        setSelectedItems([]);
      }
    } catch (error) {
      showToast("Error toggle multiple");
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
