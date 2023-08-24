import { ResourceList, Card, EmptyState, Stack } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";
import CreateTodoModal from "../modal/CreateTodoModal";
import useToast from "../../hooks/useToast";

export default function TodoTable({
  todoes,
  createTodo,
  fetchLoading,
  toggleTodo,
  removeTodo,
}) {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteLoading, setDeleteLoadingg] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const removeClick = async (ids) => {
    if (deleteLoading) return;
    setDeleteLoadingg(true);
    try {
      const { success } = await removeTodo(ids);
      if (success) setSelectedItems([]);
    } catch (error) {
    } finally {
      setDeleteLoadingg(false);
    }
  };
  const toggleClick = async (ids) => {
    if (toggleLoading) return;
    setToggleLoading(true);
    try {
      const { success } = await toggleTodo(ids);
      if (success) setSelectedItems([]);
    } catch (error) {
      showToast("Error toggle multiple");
    } finally {
      setToggleLoading(false);
    }
  };

  //todo: hình như chỉ cần todos chứ không phải todoes thì phải 

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };


  //todo: không lại phải làm như này nhỉ ? anh thấy là chỉ cần truyền component vào rồi resource list nó sẽ tự check để hiển thị chứ nhỉ ?
  
  const emptyStateMarkup = !todoes.length ? (
    <EmptyState
      heading="Create todo to get started"
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p style={{ marginBottom: 20 }}>Empty todo!!</p>
      <CreateTodoModal createTodo={createTodo} />
    </EmptyState>
  ) : undefined;

  const filterControlMarkup = (
    <Stack alignment="center">
      <Stack.Item>
        <CreateTodoModal createTodo={createTodo} />
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
            onAction: () => toggleClick(selectedItems),
            disabled: toggleLoading,
          },
          {
            content: "Delete",
            onAction: () => removeClick(selectedItems),
            disabled: deleteLoading,
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
