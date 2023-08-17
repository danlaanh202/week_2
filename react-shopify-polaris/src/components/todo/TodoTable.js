import {
  ResourceList,
  Card,
  EmptyState,
  Button,
  Stack,
  TextStyle,
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
  const removeTodoMultiple = (ids) => {
    deleteMultipleData(arrayToQuery(ids, "ids")).then(({ success }) => {});
  };
  const toggleTodoMultiple = (ids) => {
    toggleMultipleData(arrayToQuery(ids, "ids")).then(({ success }) => {
      if (success) {
        setTodoes((prev) => {
          return prev.map((item) => {
            const temp = { ...item, isCompleted: !item.isCompleted };
            return ids.includes(item.id) ? temp : item;
          });
        });
      }
    });
  };

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };
  useEffect(() => {
    console.log(todoes);
  }, [todoes]);

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
      {/* <Stack.Item fill>
        <TextStyle>Todoes</TextStyle>
        {todoes?.length > 0 && <Button destructive>Delete all</Button>}
      </Stack.Item> */}
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
            loading: multipleToggleLoading,
            onAction: () => toggleTodoMultiple(selectedItems),
          },
          {
            content: "Delete",
            loading: multipleDeleteLoading,
            onAction: () => removeTodoMultiple(selectedItems),
          },
        ]}
        renderItem={(item) => <TodoItem setTodoes={setTodoes} todo={item} />}
        selectable
      />
    </Card>
  );
}
