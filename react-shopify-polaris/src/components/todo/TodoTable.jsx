import { ResourceList, Card } from "@shopify/polaris";

import { useState } from "react";
import TodoItem from "./TodoItem";
import useTodo from "../../hooks/useTodo";

export default function TodoTable() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "todo",
    plural: "todoes",
  };

  const { todos } = useTodo();

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={todos}
        renderItem={TodoItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </Card>
  );
}
