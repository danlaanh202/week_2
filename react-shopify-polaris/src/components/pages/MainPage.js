import { Card, EmptyState, Page, ResourceList, Stack } from "@shopify/polaris";
import CreateTodoModal from "../modal/CreateTodoModal";
import useToast from "../../hooks/useToast";
import useFetchApi from "../../hooks/useFetchApi";
import fetchData from "../../helpers/utils/requestApi";
import { useState } from "react";
import TodoItem from "../todo/TodoItem";
import TodoRequest from "../../helpers/utils/TodoRequest";

function MainPage() {
  const { showToast } = useToast();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: todos,
    setData: setTodos,
    loading: getLoading,
  } = useFetchApi("/todos");

  const createTodo = async (text) => {
    try {
      const { success, data } = await TodoRequest.createTodo(text);
      setTodos((prev) => [data, ...prev]);
      return { success };
    } catch (error) {
      throw new Error();
    } finally {
    }
  };

  const toggleTodo = async (id) => {
    try {
      const { success } = await TodoRequest.toggleTodo(id);
      if (!success) {
        throw new Error();
      }
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        )
      );
    } catch (error) {
      showToast("Error");
    }
  };

  const removeTodo = async (id) => {
    try {
      const { success } = await TodoRequest.removeTodo(id);
      if (!success) {
        throw new Error();
      }
      setTodos((prev) => prev.map((item) => item.id !== id));
    } catch (error) {
      showToast("Error");
    }
  };

  const toggleTodos = async (ids) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const { success } = await TodoRequest.toggleTodos(ids);
      if (!success) {
        throw new Error("");
      }
      setTodos((prev) =>
        prev.map((item) =>
          ids.includes(item.id)
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      );
      setSelectedItems([]);
    } catch (error) {
      showToast("Error Toggle Todo");
    } finally {
      setIsLoading(false);
    }
  };

  const removeTodos = async (ids) => {
    if (isLoading) {
      return;
    }
    try {
      const { success } = await TodoRequest.removeTodos(ids);
      if (!success) {
        throw new Error("");
      }
      setTodos((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedItems([]);
    } catch (error) {
      showToast("Error remove todo");
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
    </EmptyState>
  );

  return (
    <Page
      title="todoes"
      primaryAction={<CreateTodoModal createTodo={createTodo} />}
    >
      <Card>
        <ResourceList
          resourceName={resourceName}
          items={todos}
          loading={isLoading || getLoading}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          emptyState={emptyStateMarkup}
          promotedBulkActions={[
            {
              content: "Toggle complete",
              onAction: () => toggleTodos(selectedItems),
              disabled: isLoading,
            },
            {
              content: "Delete",
              onAction: () => removeTodos(selectedItems),
              disabled: isLoading,
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
    </Page>
  );
}
export default MainPage;
